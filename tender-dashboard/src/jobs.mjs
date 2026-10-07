import nodemailer from 'nodemailer';
import {id,ingest} from './domain.mjs';
import {scanDay,reminderWindow} from './matching.mjs';
export async function enqueueScan(db,user=null,now=new Date(),scheduled=false){
 const day=scanDay(now);if(scheduled&&!day)return null;
 const key=scheduled?`daily:${day}`:null;const jid=id();
 const r=await db.one('INSERT INTO scan_jobs(id,dedupe_key,requested_by) VALUES($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id',[jid,key,user]);
 return r||await db.one("SELECT id,status FROM scan_jobs WHERE status IN ('queued','running') ORDER BY created_at LIMIT 1")||{alreadyScheduled:true};
}
export async function claimScan(db){
 return db.transaction(async tx=>{
  await tx.query("UPDATE scan_jobs SET status=CASE WHEN attempts>=3 THEN 'failed' ELSE 'queued' END,claim_token=NULL WHERE status='running' AND lease_until<NOW()");
  const job=await tx.one("SELECT * FROM scan_jobs WHERE status='queued' ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1");if(!job)return null;
  const token=id();return tx.one("UPDATE scan_jobs SET status='running',attempts=attempts+1,claim_token=$2,lease_until=NOW()+INTERVAL '5 minutes' WHERE id=$1 RETURNING *",[job.id,token]);
 });
}
export function fixtures(source,now=new Date()){
 const closing=new Date(now.getTime()+10*86400000).toISOString().slice(0,10)+'T08:00:00Z';
 return source==='praz'?[{externalId:'DEMO-PRAZ-001',reference:'DEMO-PRAZ-001',title:'Solar borehole pump supply and installation',issuer:'Example water authority',description:'Supply and install submersible pumps and solar systems for boreholes in Zimbabwe.',notice_type:'Invitation to bid',location:'Zimbabwe (fictional)',closing_at:closing}]:[
 {externalId:'DEMO-PRIVATE-001',reference:'DEMO-PRIVATE-001',title:'Water treatment pumps and solar grid',issuer:'Example agricultural estate',description:'Provide pumps, solar grid equipment and water treatment equipment in Zimbabwe.',notice_type:'Request for quotation',location:'Zimbabwe (fictional)',closing_at:closing},
 {externalId:'DEMO-PRIVATE-002',reference:'DEMO-PRIVATE-002',title:'Infrastructure consulting expression of interest',issuer:'Example development organisation',description:'Prior experience of sewage infrastructure is mentioned in this Zimbabwe programme.',notice_type:'Expression of interest',location:'Zimbabwe (fictional)',closing_at:null}];
}
export async function strongDigest(tx,jobId,origin){
 const staff=await tx.all('SELECT id FROM users WHERE active=TRUE');
 for(const user of staff){
  const fresh=await tx.all(`SELECT t.id,t.title,t.score FROM tenders t WHERE t.score>=70 AND t.channel<>'Manual' AND (t.closing_at IS NULL OR t.closing_at>NOW()) AND t.review_status<>'dismissed' AND NOT EXISTS(SELECT 1 FROM strong_alerts a WHERE a.tender_id=t.id AND a.recipient_id=$1) ORDER BY t.score DESC`,[user.id]);
  if(!fresh.length)continue;
  await tx.query("INSERT INTO notifications(id,dedupe_key,kind,recipient_id,subject,body) VALUES($1,$2,'discovery',$3,$4,$5) ON CONFLICT DO NOTHING",[id(),`digest:${jobId}:${user.id}`,user.id,`${fresh.length} new strong tender match${fresh.length===1?'':'es'}`,fresh.map(t=>`${t.title} (${t.score}/100)\nReview: ${origin}/?tender=${t.id}`).join('\n\n')]);
  for(const t of fresh)await tx.query('INSERT INTO strong_alerts(tender_id,recipient_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[t.id,user.id]);
 }
}
export async function runScan(db,c,job){
 const result={sources:[],notices:0};
 for(const sourceId of ['praz','private']){
  try{
   const mode=sourceId==='praz'?c.praz:c.private;
   if(mode!=='fixture')throw Error(`${sourceId==='praz'?'PRAZ authenticated collector':'Private web-search collector'} is not configured. No live collection was attempted.`);
   if(c.mode==='live')throw Error('Fixture collection is not permitted in live mode');
   const source=await db.one('SELECT * FROM sources WHERE id=$1',[sourceId]);
   const notices=fixtures(sourceId);
   await db.transaction(async tx=>{const lease=await tx.one("SELECT id FROM scan_jobs WHERE id=$1 AND claim_token=$2 AND status='running' AND lease_until>NOW() FOR UPDATE",[job.id,job.claim_token]);if(!lease)throw Error('Scan lease expired');for(const n of notices){const r=await ingest(tx,source,n);if(!r.skipped)result.notices++;}await tx.query("UPDATE sources SET status='fixture',last_success=NOW(),last_error=NULL WHERE id=$1",[sourceId]);});
   result.sources.push({source:sourceId,status:'fixture',count:notices.length});
  }catch(e){result.sources.push({source:sourceId,status:'failed',error:e.message});await db.query("UPDATE sources SET status='error',last_error=$2 WHERE id=$1",[sourceId,e.message]);}
 }
 await db.transaction(async tx=>{
  const owned=await tx.one("SELECT id FROM scan_jobs WHERE id=$1 AND claim_token=$2 AND status='running' FOR UPDATE",[job.id,job.claim_token]);if(!owned)return;
  const failures=result.sources.filter(s=>s.status==='failed').length;const status=failures===2?'failed':failures?'partial':'succeeded';
  if(failures<2)await strongDigest(tx,job.id,c.origin);
  await tx.query('UPDATE scan_jobs SET status=$2,result=$3,finished_at=NOW(),lease_until=NULL WHERE id=$1',[job.id,status,JSON.stringify(result)]);
 });
}
export async function queueReminders(db,c,now=new Date()){
 await db.transaction(async tx=>{
  const tenders=await tx.all("SELECT * FROM tenders WHERE closing_at IS NOT NULL AND owner_id IS NOT NULL AND stage IN ('preparing','approval') AND closing_at>$1",[now]);
  for(const t of tenders){const window=reminderWindow(t.closing_at,now);if(!window)continue;
   const recipients=await tx.all('SELECT id FROM users WHERE active=TRUE AND (id=$1 OR id IN (SELECT assignee_id FROM tasks WHERE tender_id=$2 AND done=FALSE))',[t.owner_id,t.id]);
   for(const u of recipients)await tx.query("INSERT INTO notifications(id,dedupe_key,kind,recipient_id,tender_id,subject,body) VALUES($1,$2,'deadline',$3,$4,$5,$6) ON CONFLICT DO NOTHING",[id(),`deadline:${t.id}:${t.deadline_version}:${window.hours}:${u.id}`,u.id,t.id,`Tender closes within ${window.name}: ${t.title}`,`Closing time: ${new Date(t.closing_at).toLocaleString('en-GB',{timeZone:'Africa/Harare'})} CAT\n${c.origin}/?tender=${t.id}`]);
  }
  const overdue=await tx.all("SELECT tasks.*,tenders.title AS tender_title FROM tasks JOIN tenders ON tenders.id=tasks.tender_id WHERE tasks.done=FALSE AND tasks.due_at<$1 AND tenders.stage NOT IN ('submitted','won','lost')",[now]);
  const managers=await tx.all("SELECT id FROM users WHERE active=TRUE AND role='manager'");
  for(const task of overdue)for(const manager of managers)await tx.query("INSERT INTO notifications(id,dedupe_key,kind,recipient_id,tender_id,subject,body) VALUES($1,$2,'escalation',$3,$4,$5,$6) ON CONFLICT DO NOTHING",[id(),`overdue:${task.id}:${new Date(task.due_at).toISOString()}:${manager.id}`,manager.id,task.tender_id,`Overdue preparation: ${task.tender_title}`,`${task.title}\n${c.origin}/?tender=${task.tender_id}`]);
 });
}
export async function deliver(db,c){
 const token=id();const batch=await db.transaction(async tx=>{
  await tx.query("UPDATE notifications SET status=CASE WHEN attempts>=5 THEN 'failed' ELSE 'pending' END,claim_token=NULL WHERE status='sending' AND lease_until<NOW()");
  const pending=await tx.all("SELECT id FROM notifications WHERE status='pending' AND available_at<=NOW() ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 50");
  const out=[];for(const p of pending){await tx.query("UPDATE notifications SET status='sending',attempts=attempts+1,claim_token=$2,lease_until=NOW()+INTERVAL '10 minutes' WHERE id=$1",[p.id,token]);out.push(await tx.one('SELECT n.*,u.email,u.active FROM notifications n JOIN users u ON u.id=n.recipient_id WHERE n.id=$1',[p.id]));}return out;
 });
 const transport=c.emailMode==='smtp'?nodemailer.createTransport({...c.smtp,connectionTimeout:10000,socketTimeout:15000}):null;
 for(const n of batch){try{
  const t=n.tender_id?await db.one('SELECT stage,deadline_version FROM tenders WHERE id=$1',[n.tender_id]):null;
  const stale=['deadline','escalation'].includes(n.kind)&&(!t||['submitted','won','lost'].includes(t.stage)||(n.kind==='deadline'&&!n.dedupe_key.startsWith(`deadline:${n.tender_id}:${t.deadline_version}:`)));
  const expiredLogin=n.kind==='login'&&Date.now()-new Date(n.created_at).getTime()>15*60000;
  if(!n.active||stale||expiredLogin){await db.query("UPDATE notifications SET status='cancelled',body=CASE WHEN kind='login' THEN '[expired sign-in link removed]' ELSE body END WHERE id=$1 AND claim_token=$2",[n.id,token]);continue;}
  if(transport)await transport.sendMail({from:c.from,to:n.email,subject:n.subject,text:n.body,messageId:`<${n.id}@${c.domain}>`});
  await db.query('UPDATE notifications SET status=$3,sent_at=$4,lease_until=NULL,last_error=NULL WHERE id=$1 AND claim_token=$2',[n.id,token,transport?'sent':'preview',transport?new Date():null]);
 }catch{await db.query("UPDATE notifications SET status=$3,last_error='Email transport failed; check SMTP connection.',available_at=NOW()+INTERVAL '5 minutes',lease_until=NULL WHERE id=$1 AND claim_token=$2",[n.id,token,n.attempts>=5?'failed':'pending']);}}
 transport?.close();
}
export function startJobs(db,c,{schedule=true}={}){let busy=false;const tick=async()=>{if(busy)return;busy=true;try{if(schedule)await enqueueScan(db,null,new Date(),true);const job=await claimScan(db);if(job)await runScan(db,c,job);await queueReminders(db,c);await deliver(db,c);}catch(e){console.error('Background job failed:',e.message);}finally{busy=false;}};const timer=setInterval(tick,c.interval);timer.unref();tick();return {tick,stop:()=>clearInterval(timer)};}

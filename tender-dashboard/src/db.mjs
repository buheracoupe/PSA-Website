import {mkdir,readFile} from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
import {PGlite} from '@electric-sql/pglite';
export async function openDB(c){
 let client,pool;
 if(c.database){pool=new pg.Pool({connectionString:c.database,max:8});client=pool;}
 else {await mkdir(c.data,{recursive:true});client=new PGlite(c.memory?undefined:path.join(c.data,'database'));await client.waitReady;}
 const execute=(conn,sql,args=[])=>conn.query(sql,args);
 let tail=Promise.resolve();
 const serialized=fn=>{const next=tail.then(fn);tail=next.catch(()=>{});return next;};
 const wrap=conn=>({query:(s,a=[])=>execute(conn,s,a),one:async(s,a=[]) => (await execute(conn,s,a)).rows[0],all:async(s,a=[]) => (await execute(conn,s,a)).rows});
 const db={...wrap(client),transaction:async fn=>{
  if(!pool)return serialized(()=>client.transaction(tx=>fn(wrap(tx))));
  const conn=await pool.connect();try{await conn.query('BEGIN');const r=await fn(wrap(conn));await conn.query('COMMIT');return r;}catch(e){await conn.query('ROLLBACK');throw e;}finally{conn.release();}
 },close:()=>pool?pool.end():client.close()};
 // PGlite has a single connection. Queue outside queries with transactions too.
 if(!pool){const raw=wrap(client);for(const k of ['query','one','all'])db[k]=(...a)=>serialized(()=>raw[k](...a));}
 return db;
}
export async function migrate(db){
 await db.query('CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
 await db.transaction(async tx=>{
  await tx.query('LOCK TABLE schema_migrations IN EXCLUSIVE MODE');
  if(await tx.one('SELECT version FROM schema_migrations WHERE version=$1',['001']))return;
  const sql=await readFile(new URL('../migrations/001_initial.sql',import.meta.url),'utf8');
  for(const statement of sql.split(';').map(s=>s.trim()).filter(Boolean))await tx.query(statement);
  await tx.query('INSERT INTO schema_migrations(version) VALUES($1)',['001']);
 });
 for(const [id,name,ch] of [['praz','PRAZ','PRAZ'],['private','Internet sources','Private'],['manual','Manual entry','Manual']])await db.query('INSERT INTO sources(id,name,channel) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',[id,name,ch]);
}

import path from 'node:path';
export function config(env=process.env){
 const c={mode:env.APP_MODE||'demo',host:env.HOST||'127.0.0.1',port:Number(env.PORT||4173),origin:env.APP_ORIGIN||'http://127.0.0.1:4173',database:env.DATABASE_URL||'',data:path.resolve(env.DATA_DIR||'data'),domain:(env.COMPANY_EMAIL_DOMAIN||'pumpsystemsafrica.com').toLowerCase(),emailMode:env.EMAIL_MODE||'preview',praz:env.PRAZ_MODE||'unconfigured',private:env.PRIVATE_MODE||'unconfigured',interval:Number(env.WORKER_INTERVAL_MS||30000),smtp:{host:env.SMTP_HOST,port:Number(env.SMTP_PORT||587),secure:env.SMTP_SECURE==='true',auth:env.SMTP_USER?{user:env.SMTP_USER,pass:env.SMTP_PASSWORD}:undefined},from:env.EMAIL_FROM};
 if(!['demo','live','test'].includes(c.mode))throw Error('APP_MODE must be demo, test or live');
 if(!['preview','smtp'].includes(c.emailMode))throw Error('Invalid EMAIL_MODE');
 if(c.mode==='live'&&(!c.database||!c.origin.startsWith('https://')||c.emailMode!=='smtp'||!c.smtp.host||!c.from))throw Error('Live mode requires PostgreSQL, HTTPS APP_ORIGIN and SMTP configuration');
 if(c.mode==='demo'&&!['127.0.0.1','localhost','::1'].includes(c.host))throw Error('Demo login may only bind to loopback. Use live mode for deployment.');
 if(c.mode==='live'&&[c.praz,c.private].includes('fixture'))throw Error('Fixture collection is forbidden in live mode');
 new URL(c.origin);return c;
}

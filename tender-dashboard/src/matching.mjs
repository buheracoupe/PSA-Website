import {createHash} from 'node:crypto';
export const KEYWORDS={
 pumps:['pump','pumps','pumpstation','pumpstations','pump station','pump stations','pumping station','pumping stations','pumping systems','booster pumps','submersible pumps','centrifugal pumps','dosing pumps','dewatering'],
 solar:['solar systems','solar system','solar grid','solar pv','photovoltaic','off grid solar','solar pumping','solar water pumps','solarisation','solarization'],
 boreholes:['borehole','boreholes','borehole drilling','drilling','borehole equipping','borehole rehabilitation','borehole maintenance','test pumping'],
 water:['water supply','water transfer','water abstraction','water reticulation','water distribution','pipelines','water treatment','purification','filtration','chlorination','chemical dosing','reverse osmosis'],
 wastewater:['sewage','sewerage','wastewater','waste water','effluent','sludge pumps','lift station'],
 irrigation:['irrigation','irrigation pumps','irrigation schemes','irrigation rehabilitation'],
 equipment:['pump repairs','pump servicing','pump maintenance','pump spares','spares','electric motors','control panels','variable frequency drives','vfd','vfds','valves','pipework']};
export const normalize=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const contains=(text,term)=>(' '+normalize(text)+' ').includes(' '+normalize(term)+' ');
export function classify(title,description=''){
 const matches=[];for(const [group,terms] of Object.entries(KEYWORDS))for(const term of terms){const inTitle=contains(title,term),inBody=contains(description,term);if(inTitle||inBody){const sentence=description.split(/(?<=[.!?\n])\s*/).find(s=>contains(s,term));matches.push({group,term,inTitle,inBody,excerpt:(inTitle?title:sentence||description).slice(0,420)});}}
 const titlePoints=matches.some(m=>m.inTitle&&m.term.includes(' '))?45:matches.some(m=>m.inTitle)?30:0;
 // Deterministic proximity rule. A term must occur in the same sentence as a procurement action.
 const procurement=description.split(/[.!?\n]/).some(s=>/\b(supply|install|repair|maintain|rehabilitat\w*|procure|purchase|provide|replace)\b/i.test(s)&&matches.some(m=>contains(s,m.term)));
 const scopePoints=matches.some(m=>m.inBody)?(procurement?35:20):0;
 const groups=new Set(matches.map(m=>m.group)).size;const breadthPoints=groups>=3?20:groups===2?10:0;
 const score=titlePoints+scopePoints+breadthPoints;
 return {score,strength:score>=70?'Strong':score>=40?'Moderate':'Weak',matches,detail:{title:titlePoints,scope:scopePoints,breadth:breadthPoints,version:'rules-v1'}};
}
export function identity({reference,issuer,title,url,externalId,sourceId}){
 const value=reference?`ref|${normalize(issuer)}|${normalize(reference)}`:url?`url|${url.split('#')[0]}`:`source|${sourceId}|${externalId||normalize(title)}`;
 return createHash('sha256').update(value).digest('hex');
}
export function scanDay(now=new Date()){
 const cat=new Date(now.getTime()+2*3600000);return cat.getUTCHours()>=8?cat.toISOString().slice(0,10):null;
}
export const REMINDERS=[{name:'7 days',hours:168},{name:'3 days',hours:72},{name:'1 day',hours:24},{name:'2 hours',hours:2}];
export function reminderWindow(closing,now=new Date()){
 const hours=(new Date(closing)-now)/3600000;if(hours<=0)return null;
 return [...REMINDERS].reverse().find(x=>hours<=x.hours)||null;
}

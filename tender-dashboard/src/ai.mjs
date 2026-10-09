// Provider boundary. No model, paid service or external data transfer is enabled by default.
// Implement a provider exposing summarize({text, title}) after selecting the AI service.
export class AIUnavailableError extends Error { constructor(){super('AI provider is not configured.');this.code='AI_UNCONFIGURED';} }
export async function summarizeTender({text,title},provider=null){
 if(!provider)throw new AIUnavailableError();
 if(typeof text!=='string'||!text.trim()||text.length>200000)throw Error('Document text must contain 1-200000 characters.');
 const result=await provider.summarize({text,title:String(title||'').slice(0,500)});
 if(!result||typeof result.summary!=='string'||result.summary.length>6000||!Array.isArray(result.requirements)||result.requirements.length>100)throw Error('Invalid AI response');
 for(const requirement of result.requirements){if(typeof requirement.text!=='string'||typeof requirement.quote!=='string'||!requirement.quote.trim()||!text.includes(requirement.quote))throw Error('AI requirement lacks an exact supporting source quote');}
 // Dates are suggestions for review; this function has no database mutation authority.
 return {summary:result.summary,requirements:result.requirements,needsHumanReview:true};
}

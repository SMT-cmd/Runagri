import {NextResponse} from 'next/server';
type Enquiry={name:string;email:string;company:string;role:string;commodity:string;quantity:string;destination:string;details:string;website:string;consent:boolean};
const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean=(s:unknown,n:number)=>typeof s==='string'?s.trim().slice(0,n):'';
const escapeHTML=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
export async function POST(request:Request){
 const origin=request.headers.get('origin');const host=request.headers.get('host');
 if(origin&&host){try{if(new URL(origin).host!==host)return NextResponse.json({error:'Request origin not accepted.'},{status:403})}catch{return NextResponse.json({error:'Invalid request origin.'},{status:403})}}
 const length=Number(request.headers.get('content-length')||0);
 if(length>12000)return NextResponse.json({error:'Message is too long.'},{status:413});
 let raw:unknown;try{const body=await request.text();if(body.length>12000)return NextResponse.json({error:'Message is too long.'},{status:413});raw=JSON.parse(body)}catch{return NextResponse.json({error:'Invalid enquiry format.'},{status:400})}
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return NextResponse.json({error:'Invalid enquiry.'},{status:400});
 const o=raw as Record<string,unknown>;
 if(o.website)return NextResponse.json({ok:true});
 const e:Enquiry={name:clean(o.name,120),email:clean(o.email,254),company:clean(o.company,160),role:clean(o.role,50),commodity:clean(o.commodity,100),quantity:clean(o.quantity,100),destination:clean(o.destination,160),details:clean(o.details,4000),website:'',consent:o.consent===true};
 if(!e.name||!emailRe.test(e.email)||!['Buyer','Supplier','Exporter','Partner'].includes(e.role)||!['Wheat','Sorghum','Barley','Other agricultural commodity'].includes(e.commodity)||e.details.length<20||!e.consent)return NextResponse.json({error:'Please complete all required enquiry information.'},{status:400});
 const key=process.env.RESEND_API_KEY,from=process.env.ENQUIRY_FROM_EMAIL;
 if(!key||!from)return NextResponse.json({error:'Direct email delivery is not configured yet.'},{status:503});
 const pairs=[['Name',e.name],['Email',e.email],['Company',e.company],['Role',e.role],['Commodity',e.commodity],['Quantity',e.quantity],['Origin/destination',e.destination],['Details',e.details]];
 const html='<h2>RunAgri website enquiry</h2>'+pairs.map(([k,v])=>'<p><b>'+escapeHTML(k)+'</b><br/>'+escapeHTML(v||'Not provided').replace(/\n/g,'<br/>')+'</p>').join('');
 const ctrl=new AbortController();const timeout=setTimeout(()=>ctrl.abort(),9000);
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:[process.env.ENQUIRY_TO_EMAIL||'frontdesk@runagri.com'],reply_to:e.email,subject:'RunAgri enquiry: '+e.commodity,html}),signal:ctrl.signal,cache:'no-store'});
  if(!response.ok){console.error('RunAgri enquiry provider returned',response.status);return NextResponse.json({error:'We could not deliver your enquiry.'},{status:502})}
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch(err){console.error('RunAgri enquiry delivery error',err instanceof Error?err.name:'unknown');return NextResponse.json({error:'The mail provider is temporarily unavailable.'},{status:502})}finally{clearTimeout(timeout)}
}

'use strict';
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=(v,max=4000)=>typeof v==='string'?v.trim().slice(0,max):'';
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed.'});}
  const size=Number(req.headers['content-length']||0);
  if(size>12000)return res.status(413).json({error:'Enquiry is too long.'});
  const origin=req.headers.origin,host=req.headers.host;
  if(origin&&host){try{if(new URL(origin).host!==host)return res.status(403).json({error:'Invalid origin.'});}catch{return res.status(403).json({error:'Invalid origin.'});}}
  const b=typeof req.body==='object'&&req.body&&!Array.isArray(req.body)?req.body:{};
  if(b.website)return res.status(200).json({ok:true});
  const name=clean(b.name,120),email=clean(b.email,254),company=clean(b.company,160),role=clean(b.role,50),commodity=clean(b.commodity,100),quantity=clean(b.quantity,100),destination=clean(b.destination,160),details=clean(b.details,4000);
  if(!name||!emailPattern.test(email)||!['Buyer','Supplier','Exporter','Partner'].includes(role)||!['Wheat','Sorghum','Barley','Other agricultural commodity'].includes(commodity)||details.length<20||b.consent!==true)return res.status(400).json({error:'Please provide a valid name, email, role, commodity, details and consent.'});
  if(!process.env.RESEND_API_KEY||!process.env.ENQUIRY_FROM_EMAIL)return res.status(503).json({error:'Direct email delivery is not yet configured.'});
  const fields=[['Full name',name],['Email',email],['Company',company||'Not supplied'],['Role',role],['Commodity',commodity],['Quantity',quantity||'Not supplied'],['Origin / destination',destination||'Not supplied'],['Opportunity details',details]];
  const html='<div style="font-family:Arial,sans-serif;max-width:680px"><h2>New RunAgri website enquiry</h2>'+fields.map(([label,value])=>'<p><strong>'+escapeHtml(label)+':</strong><br>'+escapeHtml(value).replace(/\n/g,'<br>')+'</p>').join('')+'</div>';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),8500);
  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.ENQUIRY_FROM_EMAIL,to:[process.env.ENQUIRY_TO_EMAIL||'david@runagri.com'],reply_to:email,subject:'RunAgri website enquiry — '+commodity,html}),signal:controller.signal});
    if(!response.ok){console.error('RunAgri enquiry mail provider status',response.status);return res.status(502).json({error:'The enquiry could not be delivered at this time.'});}
    return res.status(200).json({ok:true});
  }catch(error){console.error('RunAgri enquiry delivery failed',error&&error.name);return res.status(502).json({error:'The enquiry could not be delivered at this time.'});}
  finally{clearTimeout(timer);}
};
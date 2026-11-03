'use client';
import {useEffect,useMemo,useState,type FormEvent,type ChangeEvent} from 'react';
import Link from 'next/link';
import Arrow from './Arrow';
import {site} from '@/lib/site';
type Fields={name:string;email:string;company:string;role:string;commodity:string;quantity:string;destination:string;details:string;consent:boolean;website:string};
const initial:Fields={name:'',email:'',company:'',role:'',commodity:'',quantity:'',destination:'',details:'',consent:false,website:''};
export default function EnquiryForm(){
 const [form,setForm]=useState<Fields>(initial),[busy,setBusy]=useState(false),[result,setResult]=useState<{ok:boolean;message:string}|null>(null),[fallback,setFallback]=useState('');
 useEffect(()=>{const search=new URLSearchParams(window.location.search),role=search.get('role'),commodity=search.get('commodity');setForm(prev=>({...prev,role:role&&['Buyer','Supplier','Exporter','Partner'].includes(role)?role:prev.role,commodity:commodity&&['Wheat','Sorghum','Barley','Other agricultural commodity'].includes(commodity)?commodity:prev.commodity}))},[]);
 function setText(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>){setForm(p=>({...p,[e.target.name]:e.target.value}));setResult(null)}
 const percent=useMemo(()=>{const checks=[!!form.role,!!form.commodity,form.details.trim().length>=20,!!form.quantity||!!form.destination];return Math.round(checks.filter(Boolean).length/4*100)},[form]);
 const suggestions=useMemo(()=>{const hints:string[]=[];if(!form.role)hints.push('Select whether you are buying or supplying.');if(!form.commodity)hints.push('Choose a commodity.');if(!form.quantity)hints.push('Add an approximate quantity if you know it.');if(!form.destination)hints.push('Include an origin or delivery destination if available.');if(form.details.trim().length<20)hints.push('Describe the required grade, timing or capabilities.');return hints.slice(0,2)},[form]);
 function mailto(data:Fields){const subject='RunAgri website enquiry - '+data.commodity;const body=['Full name: '+data.name,'Email: '+data.email,'Company: '+(data.company||'Not provided'),'Role: '+data.role,'Commodity: '+data.commodity,'Approximate quantity: '+(data.quantity||'Not provided'),'Origin/destination: '+(data.destination||'Not provided'),'','Opportunity details:',data.details].join('\n');return 'mailto:'+site.email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)}
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setFallback('');setResult(null);
  if(!e.currentTarget.reportValidity())return;
  if(form.details.trim().length<20){setResult({ok:false,message:'Please describe the opportunity in at least 20 characters.'});return}
  setBusy(true);
  try{
   const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
   let response:Response;
   try{response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form),signal:controller.signal})}finally{clearTimeout(timeout)}
   const result=await response.json().catch(()=>({error:'We could not confirm email delivery.'}));
   if(!response.ok)throw new Error(result.error||'The enquiry could not be sent.');
   setResult({ok:true,message:'Your enquiry has been delivered to RunAgri. Thank you for contacting us.'});setForm(initial);
  }catch(e){setResult({ok:false,message:(e instanceof Error?e.message:'Email delivery is unavailable.')+' Please use the prepared email option instead.'});setFallback(mailto(form))}
  finally{setBusy(false)}
 }
 return <form onSubmit={submit} className="enquiry-form">
  <div className="form-pair"><label>Full name *<input name="name" value={form.name} required maxLength={120} autoComplete="name" placeholder="Full name" onChange={setText}/></label><label>Business email *<input type="email" name="email" value={form.email} required maxLength={254} autoComplete="email" placeholder="you@company.com" onChange={setText}/></label></div>
  <div className="form-pair"><label>Company / organisation<input name="company" value={form.company} maxLength={160} autoComplete="organization" placeholder="Company name" onChange={setText}/></label><label>I am a *<select name="role" value={form.role} required onChange={setText}><option value="">Select a role</option><option value="Buyer">Buyer / manufacturer</option><option value="Supplier">Supplier / producer</option><option value="Exporter">Exporter / aggregator</option><option value="Partner">Other trade partner</option></select></label></div>
  <div className="form-pair"><label>Commodity *<select name="commodity" value={form.commodity} required onChange={setText}><option value="">Select commodity</option><option>Wheat</option><option>Sorghum</option><option>Barley</option><option>Other agricultural commodity</option></select></label><label>Approximate quantity<input name="quantity" value={form.quantity} maxLength={100} onChange={setText} placeholder="e.g. 500 metric tonnes"/></label></div>
  <label>Origin or destination<input name="destination" value={form.destination} maxLength={160} onChange={setText} placeholder="Origin and/or preferred delivery location"/></label>
  <label>Opportunity details *<textarea name="details" value={form.details} required minLength={20} maxLength={4000} rows={6} onChange={setText} placeholder="Tell us the product specification or grade, quantity, availability or delivery timing and relevant terms…"/></label>
  <aside className="brief-help" aria-label="Enquiry brief completeness"><div className="brief-help-top"><span>BRIEF COMPLETENESS</span><strong>{percent}%</strong></div><div className="brief-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Enquiry information completeness"><span style={{width:percent+'%'}}/></div><p>{suggestions.length?suggestions.join(' '):'Your enquiry has the main details needed for an initial review.'}</p></aside>
  <label className="consent-row"><input type="checkbox" checked={form.consent} required onChange={e=>setForm(p=>({...p,consent:e.target.checked}))}/><span>I agree RunAgri may use the details above to respond to my enquiry, as explained in its <Link href="/privacy">privacy notice</Link>. *</span></label>
  <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} name="website" value={form.website} autoComplete="off" onChange={setText}/></label></div>
  <button type="submit" className="btn btn-green submit-enquiry" disabled={busy}>{busy?'Sending enquiry…':'Send enquiry'}{!busy&&<Arrow/>}</button>
  {result&&<div className={'form-result '+(result.ok?'form-success':'form-error')} role="status" aria-live="polite">{result.message}</div>}
  {fallback&&<a className="mail-fallback" href={fallback}>Open prepared enquiry in your email app <Arrow/></a>}
  <p className="form-footnote">A submission is not a commodity order or firm commercial agreement. No payment information is requested.</p>
 </form>
}
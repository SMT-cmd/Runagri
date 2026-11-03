import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import Arrow from '@/components/Arrow';
import CommodityCard from '@/components/CommodityCard';
import {PageHero,SectionTitle,Tick} from '@/components/Elements';
import {commodities} from '@/lib/site';
import {pageMetadata} from '@/lib/metadata';
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return commodities.map(c=>({slug:c.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const c=commodities.find(x=>x.slug===slug);if(!c)return {};return pageMetadata(c.name+' Sourcing & Trade',c.intro,'/commodities/'+c.slug)}
export default async function CommodityDetail({params}:Props){const {slug}=await params;const c=commodities.find(x=>x.slug===slug);if(!c)notFound();return <>
<PageHero label={c.name.toUpperCase()} title={c.name+' sourcing starts with the right specification.'} description={c.intro} image={c.image} button={{href:'/contact?commodity='+c.name,text:'Enquire about '+c.name.toLowerCase()}}/>
<section className="section"><div className="container commodity-details"><div><p className="section-overline">PRODUCT OVERVIEW</p><h2>Fit for the<br/><em>intended application.</em></h2><p>{c.short} Suitability depends on grade, available documentation, origin, commercial terms and confirmed delivery arrangements.</p><div className="application-note"><span>INDUSTRIAL APPLICATIONS</span><strong>{c.uses}</strong></div><p>RunAgri does not publish guaranteed stock availability or prices. Each prospective transaction is assessed independently.</p></div><div className="detail-requirements"><span className="section-overline">ENQUIRY CHECKLIST</span><h3>What we clarify for {c.name.toLowerCase()}</h3>{c.requirements.map((x,i)=><div className="requirement-item" key={x}><b>0{i+1}</b><span>{x}</span></div>)}<Link className="btn btn-green" href={'/contact?commodity='+c.name}>Discuss a {c.name.toLowerCase()} requirement <Arrow/></Link></div></div></section>
<section className="section warm-section"><div className="container"><SectionTitle eyebrow="MORE COMMODITIES" title="Explore other areas of focus."/><div className="commodity-grid two-card-grid">{commodities.filter(x=>x.slug!==slug).map(item=><CommodityCard key={item.slug} item={item}/>)}</div></div></section>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Service',name:c.name+' sourcing coordination',provider:{'@type':'Organization',name:'RunAgri Nigeria Limited'},areaServed:['Nigeria','Africa'],serviceType:'Agricultural commodity sourcing',description:c.intro}).replace(/</g,'\\u003c')}}/>
</>}
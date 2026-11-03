import Link from 'next/link';
import Arrow from '@/components/Arrow';
import {PageHero} from '@/components/Elements';
import {faqItems,fieldsImage} from '@/lib/site';
import {pageMetadata} from '@/lib/metadata';
export const metadata=pageMetadata('Frequently Asked Questions','Find straightforward answers about RunAgri commodity sourcing, supplier introductions, prices and trade enquiries.','/faq');
export default function Faq(){const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqItems.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))};return <>
<PageHero label="FREQUENTLY ASKED QUESTIONS" title="Straight answers about commodity trade." description="The things buyers and suppliers most often need to know before starting a conversation." image={fieldsImage}/>
<section className="section warm-section"><div className="container faq-layout"><div><p className="section-overline">QUESTIONS &amp; ANSWERS</p><h2>Know more.<br/><em>Ask better.</em></h2><p>For an enquiry specific to your business, send us the details directly.</p><Link href="/contact" className="btn btn-green">Contact RunAgri <Arrow/></Link></div><div className="faq-accordion">{faqItems.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
</>}
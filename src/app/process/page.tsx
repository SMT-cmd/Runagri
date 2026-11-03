import Link from 'next/link';
import Arrow from '@/components/Arrow';
import {PageHero,SectionTitle} from '@/components/Elements';
import {fieldsImage,tradeSteps} from '@/lib/site';
import {pageMetadata} from '@/lib/metadata';
export const metadata=pageMetadata('How Our Commodity Trade Process Works','Understand RunAgri’s four-stage process for agricultural commodity requirements, counterparties, commercial terms and execution.','/process');
export default function Process(){return <>
<PageHero label="OUR PROCESS" title="From requirement to a workable transaction." description="A deliberate approach to commodity sourcing conversations, counterparty assessment and commercial coordination." image={fieldsImage} button={{href:'/contact',text:'Start a conversation'}}/>
<section className="section"><div className="container"><SectionTitle eyebrow="FOUR CORE STAGES" title="An approach designed around clarity." description="Every prospective trade is different. These stages guide how we evaluate opportunities with the relevant parties."/><div className="process-timeline">{tradeSteps.map(x=><article key={x.n}><span className="timeline-index">{x.n}</span><div><span className="section-overline">STAGE {x.n}</span><h3>{x.name}</h3><p>{x.description}</p></div></article>)}</div></div></section>
<section className="section pale-section"><div className="container two-column-content"><div><p className="section-overline">OUR WORKING PRINCIPLE</p><h2>Commercial clarity<br/><em>before commitment.</em></h2><p>Introductions, brokerage and direct trade may each have a role. The transaction scope, responsibilities, documentation, payment terms and delivery conditions must be discussed and agreed by the parties.</p></div><div className="process-statement"><p>We never present a tentative opportunity as a guaranteed commodity offer.</p><Link href="/faq" className="text-action">Frequently asked questions <Arrow/></Link></div></div></section>
</>}
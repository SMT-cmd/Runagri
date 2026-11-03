import {PageHero} from '@/components/Elements';
import EnquiryForm from '@/components/EnquiryForm';
import {pageMetadata} from '@/lib/metadata';
import {site,fieldsImage} from '@/lib/site';
export const metadata=pageMetadata('Contact RunAgri Nigeria Limited','Contact RunAgri about agricultural commodity requirements, sourcing, supplying, brokerage and other trade opportunities.','/contact');
export default function Contact(){return <>
<PageHero label="CONTACT RUNAGRI" title="A meaningful trade conversation starts here." description="Tell us what you want to buy, what you can supply or how you would like to collaborate." image={fieldsImage}/>
<section className="section warm-section"><div className="container contact-layout"><div className="contact-aside"><p className="section-overline">BUSINESS ENQUIRIES</p><h2>Make the next<br/><em>conversation count.</em></h2><p>Share the essential information for your requirement or offering. Our team can use those details to determine whether there may be a relevant commercial opportunity.</p><div className="contact-rule"><span>EMAIL</span><a href={'mailto:'+site.email}>{site.email}</a></div><div className="contact-rule"><span>COMPANY</span><strong>RunAgri Nigeria Limited</strong></div><div className="contact-caution">Submitting an enquiry does not guarantee commodity supply, acceptance, a price or a transaction.</div></div><div className="contact-form-box"><div><p className="section-overline">ENQUIRY FORM</p><h3>Tell us about the opportunity.</h3><p>Fields marked * are required.</p></div><EnquiryForm/></div></div></section>
</>}
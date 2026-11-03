import type {Metadata,Viewport} from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {site} from '@/lib/site';
import './globals.css';
export const viewport:Viewport={themeColor:'#143c29',width:'device-width',initialScale:1};
export const metadata:Metadata={
 metadataBase:new URL(site.domain),
 title:{default:'RunAgri | Agricultural Commodity Sourcing & Trade',template:'%s | RunAgri'},
 description:site.description,applicationName:'RunAgri',robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
 keywords:['agricultural commodity sourcing Nigeria','industrial grain sourcing Nigeria','wheat supply Nigeria','sorghum sourcing','barley sourcing','agricultural commodity trade Africa'],
 alternates:{canonical:site.domain},openGraph:{type:'website',locale:'en_NG',siteName:'RunAgri',url:site.domain,title:'RunAgri — Agricultural Commodity Sourcing & Trade',description:site.description},twitter:{card:'summary_large_image'},
 icons:{icon:'/favicon.svg'}
};
const org={"@context":"https://schema.org","@type":"Organization","@id":site.domain+'/#organization',name:site.name,alternateName:'RunAgri',url:site.domain,email:site.email,description:site.description};
const website={"@context":"https://schema.org","@type":"WebSite","@id":site.domain+'/#website',name:'RunAgri',url:site.domain,publisher:{"@id":site.domain+'/#organization'},inLanguage:'en-NG'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="top"><Header/><main id="content">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([org,website]).replace(/</g,'\\u003c')}}/></body></html>}

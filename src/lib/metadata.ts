import type {Metadata} from 'next';
import {site,heroImage} from './site';
export function pageMetadata(title:string,description:string,path:string):Metadata{
 const url=site.domain+path;
 return {title,description,alternates:{canonical:url},openGraph:{type:'website',title:title+' | RunAgri',description,url,siteName:'RunAgri',images:[{url:heroImage,width:1200,height:630,alt:'Agricultural commodities at RunAgri'}]},twitter:{card:'summary_large_image',title:title+' | RunAgri',description}};
}
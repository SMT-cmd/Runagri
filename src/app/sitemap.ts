import type {MetadataRoute} from 'next';
import {commodities,site} from '@/lib/site';
const routes=['','/about','/commodities','/buyers','/suppliers','/process','/faq','/contact','/privacy',...commodities.map(c=>'/commodities/'+c.slug)];
export default function sitemap():MetadataRoute.Sitemap{return routes.map((route,index)=>({url:site.domain+route,lastModified:new Date('2026-11-03T00:00:00Z'),changeFrequency:index===0?'weekly':'monthly',priority:index===0?1:index===2?.9:index>=9?.75:.8}))}
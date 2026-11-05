'use client';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {nav,site} from '@/lib/site';
import Arrow from './Arrow';
export default function Header(){
 const [open,setOpen]=useState(false);const pathname=usePathname();
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 return <>
 <a className="skip-link" href="#content">Skip to main content</a>
 <div className="info-bar"><div className="container info-inner"><span>Agricultural commodity sourcing &amp; trade</span><a className="info-email" href={'mailto:'+site.email}>{site.email}</a></div></div>
 <header className="site-header"><div className="container nav-row"><Link href="/" className="wordmark brand-header" aria-label="RunAgri home"><Image src="/runagri-footer-logo.webp" alt="" width={49} height={49} className="header-brand-mark" priority/><span className="header-brand-copy"><strong>Run<span>Agri</span><i>.</i></strong><small>TRADE · SOURCE · CONNECT</small></span></Link>
 <nav className="desktop-navigation" aria-label="Primary">{nav.map(item=><Link key={item.href} href={item.href} aria-current={pathname===item.href?'page':undefined} className={pathname===item.href?'nav-active':''}>{item.title}</Link>)}</nav>
 <Link href="/contact" className="header-cta">Discuss an opportunity <Arrow diagonal/></Link>
 <button type="button" className={'nav-toggle '+(open?'is-open':'')} aria-controls="mobile-menu" aria-expanded={open} aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}><span></span><span></span><span></span></button>
 </div><nav id="mobile-menu" className={'mobile-navigation '+(open?'is-open':'')} aria-label="Mobile navigation" hidden={!open}>{nav.map(item=><Link href={item.href} key={item.href} aria-current={pathname===item.href?'page':undefined} onClick={()=>setOpen(false)}>{item.title}<Arrow/></Link>)}<Link href="/contact" onClick={()=>setOpen(false)}>Contact us <Arrow/></Link></nav></header></>
}
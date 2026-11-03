import type { NextConfig } from 'next';
const redirects=[
  ...['about','commodities','buyers','suppliers','process','faq','contact','privacy'].map(x=>({source:'/'+x+'.html',destination:'/'+x,permanent:true})),
  ...['wheat','sorghum','barley'].map(x=>({source:'/'+x+'.html',destination:'/commodities/'+x,permanent:true})),
  {source:'/index.html',destination:'/',permanent:true}
];
const config:NextConfig={reactStrictMode:true,poweredByHeader:false,async redirects(){return redirects},async headers(){return [{source:'/(.*)',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'X-Frame-Options',value:'DENY'},{key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'}]}]}};
export default config;
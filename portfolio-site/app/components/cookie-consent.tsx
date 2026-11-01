"use client";
import {useEffect,useState} from "react";

type Consent="accepted"|"rejected"|null;
const STORAGE_KEY="james_web_cookie_consent";

export default function CookieConsent(){

 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const saved=window.localStorage.getItem(STORAGE_KEY) as Consent;
  if(saved==="accepted"||saved==="rejected"){setVisible(false);if(saved==="accepted")loadAnalytics();}
  else setVisible(true);
 },[]);
 function loadAnalytics(){
  const ga=process.env.NEXT_PUBLIC_GA4_ID;
  const gtm=process.env.NEXT_PUBLIC_GTM_ID;
  if(ga&&!document.querySelector('script[data-consent-ga4]')){
   const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(ga);s.dataset.consentGa4="true";document.head.appendChild(s);
   const inline=document.createElement("script");inline.dataset.consentGa4="true";inline.innerHTML="window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','"+ga.replace(/[^A-Z0-9-]/gi,"")+"');";document.head.appendChild(inline);
  }
  if(gtm&&!document.querySelector('script[data-consent-gtm]')){
   const s=document.createElement("script");s.dataset.consentGtm="true";s.async=true;s.src="https://www.googletagmanager.com/gtm.js?id="+encodeURIComponent(gtm);document.head.appendChild(s);
  }
 }
 function select(value:Exclude<Consent,null>){window.localStorage.setItem(STORAGE_KEY,value);setVisible(false);if(value==="accepted")loadAnalytics();}
 if(!visible)return null;
 return <aside className="cookie-consent" role="dialog" aria-label="Cookie preferences"><div><strong>Cookie preferences</strong><p>Essential site functions are always active. Optional analytics cookies are used only if you accept. Read the <a href="/privacy-policy">Privacy Policy</a>.</p></div><div className="cookie-actions"><button type="button" onClick={()=>select("rejected")}>REJECT OPTIONAL</button><button type="button" onClick={()=>select("accepted")}>ACCEPT ANALYTICS</button></div></aside>;
}

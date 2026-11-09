"use client";
import Image from "next/image";
import { useState } from "react";
import about from "../data/about.json";
import processSteps from "../data/process.json";
import faqs from "../data/faq.json";
import testimonials from "../data/testimonials.json";
import site from "../data/site.json";
import audit from "../data/free-audit.json";
function testimonialImageUrl(filename:string){return `${site.supabaseUrl}/storage/v1/object/public/${encodeURIComponent(site.supabaseBucket)}/${filename.split("/").map(encodeURIComponent).join("/")}`;}


export function AboutSection(){return <section className="home-content-section" id="about"><div className="home-section-heading"><p className="eyebrow">{about.eyebrow}</p><h2>{about.title}</h2><p>{about.story}</p></div><div className="about-layout"><div className="about-photo"><Image src={about.photo} alt={about.photoAlt} fill sizes="(max-width:700px) 80vw,320px"/></div><div className="about-copy"><h3>What I specialize in</h3><p>{about.specialty}</p><h3>Why I do this work</h3><p>{about.why}</p><h3>Tools and platforms</h3><div className="about-tags">{about.tools.map(x=><span key={x}>{x}</span>)}</div><h3>Certifications</h3><ul>{about.certifications.map(x=><li key={x}>{x}</li>)}</ul></div></div><div className="trust-stats">{about.stats.map(x=><div key={x.label}><strong>{x.value}</strong><span>{x.label}</span></div>)}</div><a className="text-link" href="/about">MORE ABOUT JAMES ↗</a></section>}

export function TestimonialsSection(){const [active,setActive]=useState<number|null>(null);const cards=[...testimonials].sort((a,b)=>a.order-b.order);const change=(delta:number)=>setActive(i=>i===null?0:(i+delta+cards.length)%cards.length);if(!cards.length)return null;return <section className="home-content-section" id="testimonials"><div className="home-section-heading"><p className="eyebrow">CLIENT EXPERIENCES</p><h2>What My Clients Say</h2><p>Real conversations from clients whose GMC and Ads accounts I got reactivated</p></div><div className="whatsapp-testimonial-grid">{cards.map((t,i)=><article className="whatsapp-testimonial-card" key={t.filename}><button className="whatsapp-image-button" type="button" onClick={()=>setActive(i)} aria-label={`Open testimonial screenshot ${i+1}`}><Image src={testimonialImageUrl(t.filename)} alt={t.alt} unoptimized width={720} height={1280} sizes="(max-width:700px) 92vw, (max-width:1000px) 46vw, 30vw" loading="lazy"/></button><span className="verified-badge">Verified client chat · GMC &amp; Ads reactivated</span><p>{t.caption}</p></article>)}</div><div className="testimonial-cta"><div><h3>Want the same result?</h3><p>Let’s review your Google Merchant Center or Ads account and map out the next steps.</p></div><div className="testimonial-cta-actions"><a className="primary-button" href="/contact">CONTACT ME ↗</a><a className="portfolio-secondary-button" href="#free-audit">FREE AUDIT ↗</a><a className="portfolio-secondary-button" href={site.fiverrUrl} target="_blank" rel="noopener noreferrer">HIRE ME ON FIVERR ↗</a></div></div>{active!==null&&<div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label="WhatsApp testimonial screenshot" onClick={()=>setActive(null)} onTouchStart={e=>{(e.currentTarget as HTMLDivElement).dataset.touchX=String(e.touches[0].clientX)}} onTouchEnd={e=>{const start=Number((e.currentTarget as HTMLDivElement).dataset.touchX||0);const delta=e.changedTouches[0].clientX-start;if(Math.abs(delta)>55)change(delta<0?1:-1)}}><button className="portfolio-lightbox-close" onClick={()=>setActive(null)} aria-label="Close">×</button><button className="testimonial-lightbox-nav prev" onClick={e=>{e.stopPropagation();change(-1)}} aria-label="Previous testimonial">‹</button><div className="testimonial-lightbox-content" onClick={e=>e.stopPropagation()}><Image src={testimonialImageUrl(cards[active].filename)} alt={cards[active].alt} unoptimized fill sizes="90vw" style={{objectFit:"contain"}} priority/><p>{cards[active].caption}</p></div><button className="testimonial-lightbox-nav next" onClick={e=>{e.stopPropagation();change(1)}} aria-label="Next testimonial">›</button></div>}</section>}

export function ProcessSection(){return <section className="home-content-section" id="process"><div className="home-section-heading"><p className="eyebrow">A CLEAR WORKFLOW</p><h2>How we work together</h2></div><div className="process-timeline">{processSteps.map(s=><article key={s.step}><span>{s.step}</span><h3>{s.title}</h3><p>{s.description}</p></article>)}</div></section>}

export function FAQSection(){const schema={"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))};return <section className="home-content-section" id="faq"><div className="home-section-heading"><p className="eyebrow">GOOD TO KNOW</p><h2>Frequently asked questions</h2></div><div className="faq-list">{faqs.map(f=><details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></section>}

type FreeReport={summary:string;findings:{title:string;detail:string;severity:string}[];nextStep:string;limitations:string;website:string;checkedAt:string};
export function FreeAuditSection(){
 const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 const [message,setMessage]=useState("");
 const [report,setReport]=useState<FreeReport|null>(null);
 async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==="sending")return;
  setStatus("sending");setMessage("");setReport(null);
  const data=new FormData(e.currentTarget);
  const payload={name:String(data.get("name")||""),email:String(data.get("email")||""),website:String(data.get("website")||""),service:String(data.get("service")||""),issue:String(data.get("issue")||""),consent:data.get("consent")==="on",company:String(data.get("company")||"")};
  try{
   const response=await fetch("/api/free-audit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
   const result=await response.json().catch(()=>({}));
   if(!response.ok||!result.report)throw new Error(result.error||"The check is temporarily unavailable. Please try again.");
   setReport(result.report);setStatus("success");
   setMessage("Your preliminary report is ready below. This free version does not send emails.");
  }catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"Please try again or contact James directly.");}
 }
 function downloadReport(){
  if(!report)return;
  const content=["PRELIMINARY WEBSITE HEALTH CHECK",report.website,"Checked: "+new Date(report.checkedAt).toLocaleString(),"",report.summary,"",...report.findings.flatMap(f=>[f.title.toUpperCase(),f.detail,""]),report.nextStep,"",report.limitations,"Contact: https://jamesemmanuel.site/contact"].join("\\n");
  const blob=new Blob([content],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="website-health-check.txt";a.click();URL.revokeObjectURL(url);
 }
 return <section className="free-audit-section" id="free-audit"><div><p className="eyebrow">FREE AUTOMATED WEBSITE CHECK</p><h2>Get an instant preliminary website health report</h2><p>Check publicly visible website trust signals and policy links. Get a short, evidence-based report on screen, with no charge.</p><p className="audit-deliverable">This is not a full Google Merchant Center, Ads or Analytics account audit. Private account issues require authorized access.</p></div>
 <div><form className="audit-form" onSubmit={handleSubmit}>
 <label>Name<input name="name" autoComplete="name" minLength={2} maxLength={100} required disabled={status==="sending"}/></label>
 <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required disabled={status==="sending"}/></label>
 <label>Website URL<input name="website" type="url" placeholder="https://example.com" maxLength={2048} required disabled={status==="sending"}/></label>
 <label>Service<select name="service" required defaultValue="" disabled={status==="sending"}><option value="" disabled>Select a service</option><option value="GMC">Google Merchant Center</option><option value="GMB">Google Business Profile</option><option value="GA4">Google Analytics 4</option><option value="GTM">Google Tag Manager</option></select></label>
 <label>Describe the issue<textarea name="issue" rows={4} minLength={10} maxLength={3000} required disabled={status==="sending"}/></label>
 <label className="audit-consent"><input type="checkbox" name="consent" required disabled={status==="sending"}/> I agree to the handling of my details as explained in the <a href="/privacy-policy">Privacy Policy</a>.</label>
 <label className="audit-honeypot" aria-hidden="true">Leave this field empty<input name="company" tabIndex={-1} autoComplete="off"/></label>
 <button className="primary-button" type="submit" disabled={status==="sending"}>{status==="sending"?"CHECKING WEBSITE…":"GET MY FREE REPORT ↗"}</button>
 {message&&<p role="status" aria-live="polite" className={status==="error"?"audit-error":"audit-success"}>{message}</p>}
 </form>
 {report&&<article aria-live="polite" style={{marginTop:24,padding:24,border:"1px solid currentColor",borderRadius:12}}>
 <p className="eyebrow">YOUR PRELIMINARY REPORT</p><h3>{report.website}</h3><p>{report.summary}</p>
 {report.findings.map((f,i)=><div key={i} style={{padding:"12px 0",borderBottom:"1px solid #8885"}}><strong>{f.title} — {f.severity==="medium"?"Needs review":f.severity==="unverified"?"Not verified":"Detected"}</strong><p>{f.detail}</p></div>)}
 <p style={{marginTop:16}}>{report.nextStep}</p><p><small>{report.limitations}</small></p>
 <div className="hero-actions"><a className="primary-button" href="/contact">CONTACT JAMES TO FIX ISSUES ↗</a><a className="hero-secondary-button" href="https://wa.me/message/E6ONVPYUJA2TK1" target="_blank" rel="noopener noreferrer">WHATSAPP ↗</a><button type="button" onClick={downloadReport}>DOWNLOAD REPORT</button></div>
 </article>}
 </div></section>;
}

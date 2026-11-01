import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies.map(({slug}) => ({slug}));
}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const study=getCaseStudy(slug);
  if(!study) return {title:"Case study not found | James"};
  return {title:`${study.brandName} Case Study | James`,description:`An anonymized ${study.serviceType.join(" and ")} project: ${study.problem}`};
}
export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const study=getCaseStudy(slug); if(!study) notFound();
  return <main className="site-shell case-shell">
    <SiteHeader />
    <article className="case-detail">
      <Link className="case-back" href="/case-studies">← ALL CASE STUDIES</Link>
      <p className="eyebrow">ANONYMIZED PROJECT · {study.serviceType.join(" / ")}</p>
      <h1>{study.brandName}</h1><p className="case-lede">{study.problem}</p>
      <div className="case-meta"><span>{study.industry}</span><span>Platform: {study.platform}</span><span>Service: {study.serviceType.join(", ")}</span></div>
      <section><h2>Overview</h2><p>{study.businessImpact}</p></section>
      <section><h2>The Problem</h2><p>{study.problem}</p></section>
      <section><h2>My Approach</h2><ol>{study.approach.map((step,i)=><li key={i}>{step}</li>)}</ol></section>
      <section><h2>The Result</h2><p>{study.result}</p>{study.metrics.length>0 && <div className="case-metrics">{study.metrics.map(m=><div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>}</section>
      <section><h2>Project Evidence</h2><p>{study.imageNote || "No screenshots are currently attached."}</p>{study.images.length > 0 && <div className="case-evidence-grid">{study.images.map((src,i)=><figure className="case-evidence" key={src}><a href={src} target="_blank" rel="noreferrer"><img src={src} alt={study.altTexts[i] || `Project evidence screenshot ${i+1}`} loading="lazy" /></a><figcaption>{study.altTexts[i] || `Project evidence ${i+1}`}</figcaption></figure>)}</div>}</section>
      <section className="case-cta"><p className="eyebrow">NEED HELP WITH A SIMILAR ISSUE?</p><h2>Have a similar issue?</h2><p>Get a free audit and a clear view of the next steps.</p><Link className="primary-button" href="/contact">GET A FREE AUDIT ↗</Link></section>
    </article>
    <SiteFooter />
  </main>;
}

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
    <header className="topbar"><Link className="wordmark" href="/">JAMES<span>.</span></Link><nav className="top-nav"><Link href="/case-studies">All case studies</Link><Link href="/contact">Contact</Link></nav><Link className="nav-cta" href="/contact">LET&apos;S TALK ↗</Link></header>
    <article className="case-detail">
      <Link className="case-back" href="/case-studies">← ALL CASE STUDIES</Link>
      <p className="eyebrow">ANONYMIZED PROJECT · {study.serviceType.join(" / ")}</p>
      <h1>{study.brandName}</h1><p className="case-lede">{study.problem}</p>
      <div className="case-meta"><span>{study.industry}</span><span>Platform: {study.platform}</span><span>Service: {study.serviceType.join(", ")}</span></div>
      <section><h2>Overview</h2><p>{study.businessImpact}</p></section>
      <section><h2>The Problem</h2><p>{study.problem}</p></section>
      <section><h2>My Approach</h2><ol>{study.approach.map((step,i)=><li key={i}>{step}</li>)}</ol></section>
      <section><h2>The Result</h2><p>{study.result}</p>{study.metrics.length>0 && <div className="case-metrics">{study.metrics.map(m=><div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>}</section>
      <section><h2>Before / After Evidence</h2><p>{study.imageNote || "TBC — evidence images are being prepared."}</p></section>
      <section className="case-cta"><p className="eyebrow">NEED HELP WITH A SIMILAR ISSUE?</p><h2>Have a similar issue?</h2><p>Get a free audit and a clear view of the next steps.</p><Link className="primary-button" href="/contact">GET A FREE AUDIT ↗</Link></section>
    </article>
    <footer className="footer"><Link className="wordmark" href="/">JAMES<span>.</span></Link><p>© {new Date().getFullYear()} James. All rights reserved.</p><Link href="/contact">CONTACT ↗</Link></footer>
  </main>;
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Study = { slug:string; brandName:string; industry:string; serviceType:string[]; problem:string; result:string; metrics:{label:string;value:string}[] };
const filters = ["All","GMC","GMB","GA4","GTM","Google Ads"] as const;
export default function CaseStudyFilters({ studies, initialService = "All" }: { studies: Study[]; initialService?: string }) {
  const [active,setActive] = useState<string>(initialService);
  const visible = useMemo(() => studies.filter(s => active === "All" || s.serviceType.includes(active)),[studies,active]);
  return <>
    <div className="case-filters" role="group" aria-label="Filter case studies">
      {filters.map(f => <button key={f} type="button" className={active===f ? "active" : ""} aria-pressed={active===f} onClick={()=>setActive(f)}>{f}</button>)}
    </div>
    <section className="case-grid" aria-live="polite">
      {visible.map(s => <article className="case-card" key={s.slug}>
        <div className="case-card-top"><span>{s.industry}</span><div className="case-tags">{s.serviceType.map(t=><span key={t}>{t}</span>)}</div></div>
        <h2>{s.brandName}</h2>
        <p>{s.problem}</p>
        <div className="case-result"><span>DOCUMENTED RESULT</span><p>{s.metrics.length ? s.metrics.map(m=>m.value+" "+m.label.toLowerCase()).join(" · ") : s.result}</p></div>
        <Link className="case-read-link" href={"/case-studies/"+s.slug}>READ CASE STUDY <span aria-hidden="true">↗</span></Link>
      </article>)}
      {visible.length===0 && <p>No case studies in this category yet. More evidence is being reviewed.</p>}
    </section>
  </>;
}

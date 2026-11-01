import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import type {Metadata} from "next";
import terms from "../../data/terms-of-service.json";
export const metadata:Metadata={title:"Terms of Service | James",description:"Read the terms that apply to digital, analytics and e-commerce services provided by James."};
export default function TermsPage(){return <main className="site-shell legal-page"><SiteHeader /><section className="legal-hero"><p className="eyebrow">WORKING TOGETHER</p><h1>{terms.title}</h1><p>{terms.intro}</p><small>Last updated: {terms.lastUpdated}</small></section><article className="legal-content">{terms.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>)}<p className="legal-contact">Contact: <a href={`mailto:${terms.contactEmail}`}>{terms.contactEmail}</a></p></article><SiteFooter /></main>}

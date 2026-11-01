import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import type {Metadata} from "next";
import policy from "../../data/privacy-policy.json";
export const metadata:Metadata={title:"Privacy Policy | James",description:"Learn how James handles enquiry details, website analytics, cookies and personal information."};
export default function PrivacyPolicyPage(){return <main className="site-shell legal-page"><SiteHeader /><section className="legal-hero"><p className="eyebrow">YOUR INFORMATION</p><h1>{policy.title}</h1><p>{policy.intro}</p><small>Last updated: {policy.lastUpdated}</small></section><article className="legal-content">{policy.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>)}<p className="legal-contact">Contact: <a href={`mailto:${policy.contactEmail}`}>{policy.contactEmail}</a></p></article><SiteFooter /></main>}

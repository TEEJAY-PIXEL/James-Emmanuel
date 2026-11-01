import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import type { Metadata } from "next";
import Image from "next/image";
import about from "../../data/about.json";
export const metadata:Metadata={title:"About James | Google & E-commerce Specialist",description:"Meet James, a freelance Google ecosystem and e-commerce specialist based in Lagos, Nigeria."};
export default function AboutPage(){return <main className="site-shell"><SiteHeader /><section className="about-page"><p className="eyebrow">{about.eyebrow}</p><h1>{about.title}</h1><div className="about-layout"><div className="about-photo"><Image src={about.photo} alt={about.photoAlt} fill sizes="(max-width:700px) 80vw,320px" priority/></div><div className="about-copy"><p>{about.story}</p><h2>My specialty</h2><p>{about.specialty}</p><h2>Why I do this</h2><p>{about.why}</p><h2>Tools and platforms</h2><div className="about-tags">{about.tools.map(x=><span key={x}>{x}</span>)}</div><h2>Certifications</h2><ul>{about.certifications.map(x=><li key={x}>{x}</li>)}</ul></div></div><div className="trust-stats">{about.stats.map(x=><div key={x.label}><strong>{x.value}</strong><span>{x.label}</span></div>)}</div></section><SiteFooter /></main>}

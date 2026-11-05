import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import type {Metadata} from "next";
import pricing from "../../data/pricing.json";

export const metadata:Metadata={
  title:"GMC Suspension Fix Pricing & Google Services",
  alternates: { canonical: "/pricing" },
  description:"Explore transparent packages for Google Merchant Center, Google Business Profile, GA4, GTM and website design."
};

type PackageItem={name:string;price:string;audience:string;items:string[];turnaround:string;cta:string;href?:string;popular?:boolean};
function packageInquiry(p:PackageItem){
  const subject=encodeURIComponent(`Project inquiry: ${p.name} (${p.price})`);
  const body=encodeURIComponent(`Hello James, I am interested in the ${p.name} package (${p.price}).\n\nMy website: \nMy issue / goals: \n\nPlease advise on next steps and how to order through Fiverr or Upwork.`);
  return `mailto:jamesmanuel966@gmail.com?subject=${subject}&body=${body}`;
}
function PackageCards({packages}:{packages:PackageItem[]}){
  return <div className="pricing-grid">{packages.map((p)=><article className={`pricing-card ${p.popular?"pricing-popular":""}`} key={p.name}>
    {p.popular&&<span className="popular-label">MOST POPULAR</span>}
    <h3>{p.name}</h3><p className="pricing-price"><strong>{p.price}</strong></p>
    <p className="pricing-audience">{p.audience}</p>
    <ul>{p.items.map((item)=><li key={item}>{item}</li>)}</ul>
    <p className="pricing-turnaround"><strong>Turnaround</strong><br/>{p.turnaround}</p>
    <a className="primary-button" href={packageInquiry(p)}>{p.cta} ↗</a>
  </article>)}</div>;
}

export default function PricingPage(){
 return <main className="site-shell"><SiteHeader/>
  <section className="legal-hero"><p className="eyebrow">WORK WITH ME</p><h1>{pricing.title}</h1><p>{pricing.subtitle}</p></section>
  <section className="pricing-service-section" id="gmc"><div className="pricing-section-heading"><p className="eyebrow">GOOGLE MERCHANT CENTER</p><h2>GMC packages</h2><p>Practical support for Merchant Center audits, product feed issues and website compliance.</p></div><PackageCards packages={pricing.packages}/></section>
  {pricing.serviceSections.map((section)=><section className="pricing-service-section" id={section.id} key={section.id}>
    <div className="pricing-section-heading"><p className="eyebrow">SERVICE PACKAGES</p><h2>{section.title}</h2><p>{section.description}</p></div>
    <PackageCards packages={section.packages}/>
  </section>)}
  <section className="pricing-custom"><div><p className="eyebrow">HAVE A UNIQUE REQUIREMENT?</p><h2>{pricing.customProjects}</h2></div><a className="primary-button" href="/contact">LET'S TALK ↗</a></section>
  <section className="pricing-comparison"><h2>GMC package comparison</h2><div className="table-scroll"><table><thead><tr><th>Included</th><th>{pricing.packages[0].name}</th><th>{pricing.packages[1].name}</th><th>{pricing.packages[2].name}</th></tr></thead><tbody>{pricing.comparison.map((r)=><tr key={r.feature}><th scope="row">{r.feature}</th><td>{r.audit}</td><td>{r.setup}</td><td>{r.monthly}</td></tr>)}</tbody></table></div><p>{pricing.note}</p><div className="pricing-links"><a href="/#faq">READ THE FAQ ↗</a><a href="/#free-audit">GET A FREE AUDIT ↗</a></div></section>
  <SiteFooter/></main>;
}

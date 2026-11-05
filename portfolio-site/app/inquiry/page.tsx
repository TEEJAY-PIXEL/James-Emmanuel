import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import type { Metadata } from "next";
import pricing from "../../data/pricing.json";

export const metadata: Metadata = {
  title: "Package Inquiry | James Emmanuel",
  description: "Contact James Emmanuel about a Google Merchant Center, analytics, or website service package.",
  robots: { index: false, follow: true },
};

type Package = { name: string; price: string; audience: string; items: string[] };
const packages: Package[] = [...pricing.packages, ...pricing.serviceSections.flatMap(s => s.packages)];
export default async function InquiryPage({searchParams}:{searchParams: Promise<{package?:string}>}) {
  const params = await searchParams;
  const selected = packages.find(p => p.name === params.package);
  const subject = selected ? `Inquiry: ${selected.name} (${selected.price})` : "Project inquiry";
  const message = selected
    ? `Hello James, I am interested in the ${selected.name} package (${selected.price}). My website is: . My main issue or goal is: . Please advise on the next steps.`
    : "Hello James, I would like to discuss a project. My website is: . My main issue or goal is: .";
  const emailHref = `mailto:jamesmanuel966@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  const whatsappHref = `https://wa.me/message/E6ONVPYUJA2TK1`;
  return <main className="site-shell"><SiteHeader/>
    <section className="legal-hero"><p className="eyebrow">PACKAGE INQUIRY</p>
      <h1>{selected ? selected.name : "Let's discuss your project"}</h1>
      <p>{selected ? `Selected package: ${selected.price}` : "Tell me about your business and what you need help with."}</p>
    </section>
    <section className="pricing-custom" style={{display:"block",maxWidth:780,margin:"32px auto 70px"}}>
      {selected && <><h2>What this package covers</h2><p>{selected.audience}</p>
        <ul style={{lineHeight:1.9,marginBottom:28}}>{selected.items.map(item=><li key={item}>{item}</li>)}</ul></>}
      <h2>Choose how to get in touch</h2>
      <p>Send an email with your selected package already included, or message me on WhatsApp. Projects can be arranged through Fiverr or Upwork.</p>
      <div className="hero-actions" style={{justifyContent:"flex-start"}}>
        <a className="primary-button" href={emailHref}>SEND PACKAGE INQUIRY ↗</a>
        <a className="hero-secondary-button" href={whatsappHref} target="_blank" rel="noopener noreferrer">CHAT ON WHATSAPP ↗</a>
      </div>
      <p style={{marginTop:24}}>Email: <a href={emailHref}><strong>jamesmanuel966@gmail.com</strong></a></p>
      <p><a href="/pricing">← Back to pricing</a></p>
    </section>
    <SiteFooter/>
  </main>;
}

import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import CaseStudyFilters from "./case-study-filters";

export const metadata: Metadata = {
  title: "Case Studies | James — Google Ecosystem & Digital Specialist",
  description: "Anonymized project evidence across Google Merchant Center, Google Business Profile, GA4 and Google Ads.",
};

export default async function CaseStudiesPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  return (
    <main className="site-shell case-shell">
      <SiteHeader />
      <section className="case-hero">
        <p className="eyebrow">SELECTED PROJECT EVIDENCE</p>
        <h1>Real account work.<br/><span>Clear, honest evidence.</span></h1>
        <p>Examples of Google ecosystem and e-commerce support, presented with anonymized client identities. Results are limited to what the available project files actually show.</p>
      </section>
      <CaseStudyFilters studies={caseStudies} initialService={service === "GMC" ? "GMC" : "All"} />
      <section className="case-cta"><p className="eyebrow">MERCHANT CENTER SUPPORT</p><h2>Have a similar GMC issue?</h2><p>Choose an audit or compliance package. Google makes final approval decisions.</p><a className="primary-button" href="/pricing#gmc">VIEW GMC PACKAGES ↗</a></section>
      <p className="case-privacy-note">Client names are anonymized. Original screenshots are withheld until identifying details can be safely redacted. Figures shown are account snapshots, not promises of business outcomes.</p>
      <SiteFooter />
    </main>
  );
}

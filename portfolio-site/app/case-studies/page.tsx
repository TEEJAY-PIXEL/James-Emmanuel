import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import CaseStudyFilters from "./case-study-filters";

export const metadata: Metadata = {
  title: "Case Studies | James — Google Ecosystem & Digital Specialist",
  description: "Anonymized project evidence across Google Merchant Center, Google Business Profile, GA4 and Google Ads.",
};

export default function CaseStudiesPage() {
  return (
    <main className="site-shell case-shell">
      <header className="topbar">
        <Link className="wordmark" href="/">JAMES<span>.</span></Link>
        <nav className="top-nav" aria-label="Main navigation">
          <Link href="/#expertise">Expertise</Link><Link href="/case-studies">Case studies</Link><Link href="/contact">Contact</Link>
        </nav>
        <Link className="nav-cta" href="/contact">LET&apos;S TALK ↗</Link>
      </header>
      <section className="case-hero">
        <p className="eyebrow">SELECTED PROJECT EVIDENCE</p>
        <h1>Real account work.<br/><span>Clear, honest evidence.</span></h1>
        <p>Examples of Google ecosystem and e-commerce support, presented with anonymized client identities. Results are limited to what the available project files actually show.</p>
      </section>
      <CaseStudyFilters studies={caseStudies} />
      <p className="case-privacy-note">Client names are anonymized. Original screenshots are withheld until identifying details can be safely redacted. Figures shown are account snapshots, not promises of business outcomes.</p>
      <footer className="footer"><Link className="wordmark" href="/">JAMES<span>.</span></Link><p>© {new Date().getFullYear()} James. All rights reserved.</p><Link href="/contact">CONTACT ↗</Link></footer>
    </main>
  );
}

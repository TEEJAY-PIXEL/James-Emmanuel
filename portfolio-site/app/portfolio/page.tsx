import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import type { Metadata } from "next";
import PortfolioGallery, { type Business } from "./portfolio-gallery";
import portfolio from "../../data/portfolio.json";
import { caseStudies } from "../../lib/case-studies";
import site from "../../data/site.json";

export const metadata: Metadata = {
  title: "Projects I've Delivered | James — Google Ecosystem Portfolio",
  description: "Selected Google Merchant Center, Google Business Profile, GA4 and Google Ads projects delivered by James, with project evidence and documented outcomes.",
};

export default function PortfolioPage() {
  return <main className="site-shell portfolio-page">
    <SiteHeader />
    <section className="portfolio-hero"><p className="eyebrow">SELECTED CLIENT WORK</p><h1>Projects I&apos;ve <span>Delivered</span></h1><p>Real project evidence from Google Merchant Center, Google Business Profile, Analytics and Ads work. Each gallery uses a watermarked copy of the source image.</p></section>
    <section className="portfolio-cta"><div><p className="eyebrow">GMC CASE STUDIES</p><h2>Dealing with a Merchant Center suspension?</h2><p>Explore anonymized case studies showing the issue, review process and documented account status.</p></div><div className="portfolio-cta-actions"><a className="primary-button" href="/case-studies?service=GMC">VIEW GMC CASE STUDIES ↗</a><a className="portfolio-secondary-button" href="/pricing#gmc">GMC PACKAGES ↗</a></div></section>
    <PortfolioGallery businesses={portfolio.businesses as Business[]} caseStudySlugs={caseStudies.map((study) => study.slug)} />
    <section className="portfolio-cta"><div><p className="eyebrow">LET&apos;S WORK TOGETHER</p><h2>Want results like these?</h2><p>Tell me what you’re working on and let’s discuss the right next step for your business.</p></div><div className="portfolio-cta-actions"><a className="primary-button" href="/contact">CONTACT <span>↗</span></a><a className="portfolio-secondary-button" href="https://www.upwork.com/freelancers/~01df1fa08cbbe1786f" target="_blank" rel="noreferrer">UPWORK ↗</a><a className="portfolio-secondary-button" href={site.fiverrUrl} target="_blank" rel="noreferrer">FIVERR ↗</a></div></section>
    <SiteFooter />
  </main>;
}

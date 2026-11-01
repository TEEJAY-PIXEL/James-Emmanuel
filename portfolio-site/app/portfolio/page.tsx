import type { Metadata } from "next";
import PortfolioGallery from "./portfolio-gallery";
import portfolio from "../../data/portfolio.json";
import { caseStudies } from "../../lib/case-studies";

export const metadata: Metadata = {
  title: "Projects I've Delivered | James — Google Ecosystem Portfolio",
  description: "Selected Google Merchant Center, Google Business Profile, GA4 and Google Ads projects delivered by James, with project evidence and documented outcomes.",
};

export default function PortfolioPage() {
  return <main className="site-shell portfolio-page">
    <header className="topbar">
      <a className="wordmark" href="/" aria-label="James home">JAMES<span>.</span></a>
      <nav className="top-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/case-studies">Case studies</a><a href="/contact">Contact</a></nav>
      <a className="nav-cta" href="/contact">LET&apos;S TALK <span aria-hidden="true">↗</span></a>
    </header>
    <section className="portfolio-hero"><p className="eyebrow">SELECTED CLIENT WORK</p><h1>Projects I&apos;ve <span>Delivered</span></h1><p>Real project evidence from Google Merchant Center, Google Business Profile, Analytics and Ads work. Each gallery uses a watermarked copy of the source image.</p></section>
    <PortfolioGallery businesses={portfolio.businesses} caseStudySlugs={caseStudies.map((study) => study.slug)} />
    <section className="portfolio-cta"><div><p className="eyebrow">LET&apos;S WORK TOGETHER</p><h2>Want results like these?</h2><p>Tell me what you’re working on and let’s discuss the right next step for your business.</p></div><div className="portfolio-cta-actions"><a className="primary-button" href="/contact">CONTACT <span>↗</span></a><a className="portfolio-secondary-button" href="https://www.upwork.com/freelancers/~01df1fa08cbbe1786f" target="_blank" rel="noreferrer">UPWORK ↗</a><a className="portfolio-secondary-button" href="https://www.fiverr.com/" target="_blank" rel="noreferrer">FIVERR ↗</a></div></section>
    <footer className="footer"><a className="wordmark" href="/">JAMES<span>.</span></a><p>All work © James_web</p><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
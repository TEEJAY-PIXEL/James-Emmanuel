import Image from "next/image";
import { AboutSection, TestimonialsSection, ProcessSection, FAQSection, FreeAuditSection } from "./home-sections";

const services = [
  "Shopify",
  "Wix",
  "WordPress",
  "Google Merchant Center",
  "Google Business Profile",
  "GA4 & GTM",
];

const serviceDetails = [
  {
    number: "01",
    title: "Website Development",
    summary: "Professional, responsive websites and online stores built around your brand and business goals.",
    what: "I design, build, refresh and improve websites on Shopify, Wix and WordPress. This can include landing pages, e-commerce setup, product and collection layouts, mobile optimization, essential on-page SEO and launch checks.",
    audience: "Entrepreneurs, small businesses, creators and established brands that need a credible website, a better online store or a redesign that makes it easier for customers to take action.",
    deliverables: ["Responsive website or store", "Pages and layouts tailored to your goals", "Core store or contact functionality", "Basic on-page SEO and launch checks"],
    turnaround: "Typically 5–10 business days for a standard website. Larger stores, custom features and extensive redesigns take longer.",
  },
  {
    number: "02",
    title: "Virtual Assistant",
    summary: "Reliable day-to-day e-commerce and online business support that gives you more time to focus.",
    what: "I support online business operations with product uploads and listing updates, product research, order and inventory admin, customer-message support, website content updates and routine store management tasks.",
    audience: "Shopify and e-commerce store owners, founders, solo entrepreneurs and busy teams that need dependable operational help without hiring a full-time employee.",
    deliverables: ["Agreed task list and working process", "Accurate product and store updates", "Organized admin and research records", "Regular progress updates"],
    turnaround: "Usually 1–3 business days to agree scope and get started after access and instructions are provided. Ongoing support is scheduled weekly or monthly.",
  },
  {
    number: "03",
    title: "Google Merchant Center (GMC)",
    summary: "Cleaner product data and a healthier Merchant Center setup for your shopping campaigns.",
    what: "I help set up or review Merchant Center, connect product sources, improve feed attributes, check diagnostics and investigate common account or product disapprovals and policy issues.",
    audience: "E-commerce businesses and product-based brands that want to list products on Google, improve feed quality or understand Merchant Center warnings and suspensions.",
    deliverables: ["Account and feed review", "Product data and attribute improvements", "Diagnostics and issue checklist", "Practical policy and next-step recommendations"],
    turnaround: "Typically 2–5 business days for setup or feed work. Complex diagnostics or account suspension cases may take 5–10+ business days; Google review times are outside my control.",
  },
  {
    number: "04",
    title: "Google Business Profile (GMB)",
    summary: "A complete, accurate local business profile that helps nearby customers find and contact you.",
    what: "I optimize your Google Business Profile with accurate business details, categories, services, descriptions, photos, posts and a practical review-response approach. I can also help troubleshoot profile issues and guide the verification process.",
    audience: "Local service providers, shops, consultants, restaurants and businesses that serve customers in a defined geographic area.",
    deliverables: ["Profile audit and optimization", "Business details, categories and services updated", "Photo and post recommendations", "Review and local visibility action plan"],
    turnaround: "Typically 2–4 business days once the profile and business information are available. Verification and Google-led changes can take longer.",
  },
  {
    number: "05",
    title: "Google Analytics 4 (GA4)",
    summary: "Useful measurement that shows how people find, use and convert on your website.",
    what: "I set up or audit GA4, configure key events and conversions, check ecommerce measurement where applicable, and create clear reporting views so you can understand the actions that matter to your business.",
    audience: "Website owners, e-commerce teams and marketers who want more confidence in their traffic, engagement and conversion data.",
    deliverables: ["GA4 property and data-stream setup or audit", "Key events and conversion configuration", "E-commerce tracking review where applicable", "Measurement notes and reporting guidance"],
    turnaround: "Typically 1–3 business days for a standard setup or audit. More complex ecommerce and cross-domain tracking needs additional testing.",
  },
  {
    number: "06",
    title: "Google Tag Manager (GTM)",
    summary: "A more organized way to manage website tracking tags and measurement events.",
    what: "I configure GTM containers, tags, triggers and variables, connect supported analytics and marketing tools, and test events in preview/debug mode before publishing changes.",
    audience: "Businesses and marketing teams that need reliable event tracking, cleaner tag management or a structured setup for analytics and advertising measurement.",
    deliverables: ["GTM container setup or audit", "Required tags, triggers and variables", "Event testing and validation", "Publishing notes and handover"],
    turnaround: "Typically 1–2 business days for a straightforward setup. Custom events, multiple platforms and consent requirements can extend the timeline.",
  },
];

export default function Home() {
  return (
    <main className="site-shell" id="top">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="James home">
          JAMES<span>.</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#expertise">Expertise</a>
          <a href="#services">Services</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/case-studies">Case studies</a>
          <a href="/contact">Contact</a>
        </nav>
        <a className="nav-cta" href="/contact">
          LET&apos;S TALK <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="intro-section">
        <p className="eyebrow">INDEPENDENT DIGITAL SPECIALIST</p>
        <h1>
          Helping businesses build
          <br />
          <span>better digital experiences.</span>
        </h1>
        <p className="intro-copy">
          I&apos;m James — I design and optimize business websites, support
          e-commerce operations and build measurement systems that help brands
          grow with confidence.
        </p>
      </section>

      <section className="profile-wrap" aria-label="About James">
        <article className="profile-card">
          <div className="card-topline">
            <span>PERSONAL PORTFOLIO</span>
            <span className="availability">
              <i /> AVAILABLE FOR PROJECTS
            </span>
          </div>

          <div className="portrait-frame">
            {/* Add your portrait at public/images/james-profile.webp */}
            <Image
              src="/portfolio-watermarked/1777307059782.webp"
              alt="James, website and digital operations specialist"
              className="portrait"
              width={220}
              height={260}
              priority
            />
          </div>

          <div className="profile-copy">
            <p className="profile-kicker">YOUR DIGITAL GROWTH PARTNER</p>
            <h2>Hi, I&apos;m James.</h2>
            <p className="profile-description">
              I help entrepreneurs and growing businesses create polished
              websites, keep their online operations moving and make better
              decisions with accurate measurement.
            </p>

            <div className="service-pills" aria-label="Platforms and services">
              {services.map((service) => (
                <span className="service-pill" key={service}>
                  {service}
                </span>
              ))}
            </div>

            <a className="primary-button" href="/contact">
              LET&apos;S BUILD SOMETHING GREAT <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="card-bottomline">
            <span>WEBSITE DEVELOPMENT</span>
            <span>VIRTUAL ASSISTANCE</span>
            <span>ANALYTICS & TRACKING</span>
          </div>
        </article>
      </section>

      <section className="expertise-section" id="expertise">
        <div className="section-heading">
          <p className="eyebrow">HOW I CAN HELP</p>
          <h2>Practical support. Clear deliverables.</h2>
          <p>
            Choose the service that fits your next step. Every project starts
            with a clear scope, agreed deliverables and a realistic timeline.
          </p>
        </div>

        <div className="service-grid" id="services">
          {serviceDetails.map((item) => (
            <article className="service-card detail-card" key={item.number}>
              <div className="service-card-heading">
                <span className="service-number">{item.number}</span>
                <span className="service-label">SERVICE</span>
              </div>
              <h3>{item.title}</h3>
              <p className="service-summary">{item.summary}</p>

              <div className="service-detail">
                <h4>What I do</h4>
                <p>{item.what}</p>
              </div>
              <div className="service-detail">
                <h4>Who it&apos;s for</h4>
                <p>{item.audience}</p>
              </div>
              <div className="service-detail">
                <h4>What you get</h4>
                <ul>
                  {item.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
              <div className="turnaround">
                <span>Typical turnaround</span>
                <p>{item.turnaround}</p>
              </div>
              <a className="service-link" href="/contact">
                DISCUSS THIS SERVICE <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="timeline-note">
          Timelines are estimates for typical projects and begin once the
          required access, content and information are supplied. Final timing
          depends on scope, feedback and any third-party reviews.
        </p>
      </section>


      <AboutSection />
      <TestimonialsSection />
      <ProcessSection />
      <FAQSection />
      <FreeAuditSection />

      <footer className="footer">
        <a className="wordmark" href="#top">
          JAMES<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} James. All rights reserved.</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

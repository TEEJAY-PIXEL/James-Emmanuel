const services = [
  "Shopify",
  "Wix",
  "WordPress",
  "Google Merchant Center",
  "Google Analytics",
  "GA4 Tracking",
];

const capabilities = [
  {
    number: "01",
    title: "Website Design",
    description:
      "Clean, responsive websites and online stores built to give your business a professional online presence.",
  },
  {
    number: "02",
    title: "Google Merchant Center",
    description:
      "Merchant Center setup, product feed optimization, diagnostics and policy issue support.",
  },
  {
    number: "03",
    title: "Analytics & Tracking",
    description:
      "Google Analytics and GA4 configuration to help you understand traffic, events and conversions.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="James home">
          JAMES<span>.</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#expertise">Expertise</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">
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
          I&apos;m James — I design and optimize business websites, e-commerce
          stores and measurement systems that help brands grow with confidence.
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
            <img
              src="/images/james-profile.webp"
              alt="James, e-commerce and analytics specialist"
              className="portrait"
            />
          </div>

          <div className="profile-copy">
            <p className="profile-kicker">YOUR DIGITAL GROWTH PARTNER</p>
            <h2>Hi, I&apos;m James.</h2>
            <p className="profile-description">
              I help entrepreneurs and growing businesses create polished
              websites, improve their e-commerce operations and make better
              decisions with accurate analytics.
            </p>

            <div className="service-pills" aria-label="Platforms and services">
              {services.map((service) => (
                <span className="service-pill" key={service}>
                  {service}
                </span>
              ))}
            </div>

            <a className="primary-button" href="#contact">
              LET&apos;S BUILD SOMETHING GREAT <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="card-bottomline">
            <span>WEBSITE DESIGN</span>
            <span>ECOMMERCE</span>
            <span>GOOGLE ANALYTICS</span>
          </div>
        </article>
      </section>

      <section className="expertise-section" id="expertise">
        <div className="section-heading">
          <p className="eyebrow">WHAT I DO</p>
          <h2>Practical solutions. Clear outcomes.</h2>
          <p>
            From the first click to the final conversion, I help connect the
            pieces of your online business.
          </p>
        </div>

        <div className="service-grid" id="services">
          {capabilities.map((item) => (
            <article className="service-card" key={item.number}>
              <span className="service-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
          <h2>Let&apos;s make your next move count.</h2>
          <p>
            Tell me what you&apos;re building and where you need support. I&apos;d
            be glad to discuss how I can help.
          </p>
        </div>
        <a className="primary-button contact-button" href="mailto:">
          GET IN TOUCH <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="footer">
        <a className="wordmark" href="#">
          JAMES<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} James. All rights reserved.</p>
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}
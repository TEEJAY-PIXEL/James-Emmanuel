const contactMethods = [
  { number: "01", name: "Email", detail: "For project inquiries, questions and detailed briefs.", action: "SEND AN EMAIL", href: "mailto:jamesmanuel966@gmail.com", external: false },
  { number: "02", name: "WhatsApp", detail: "Message me directly to discuss your project.", action: "CHAT ON WHATSAPP", href: "https://wa.me/message/E6ONVPYUJA2TK1", external: true },
  { number: "03", name: "LinkedIn", detail: "Connect with me and explore my professional background.", action: "CONNECT ON LINKEDIN", href: "https://www.linkedin.com/in/tee-jay-342g5", external: true },
  { number: "04", name: "Upwork", detail: "View my freelancer profile and work with me on a project.", action: "HIRE ME ON UPWORK", href: "https://www.upwork.com/freelancers/~01df1fa08cbbe1786f", external: true },
  { number: "05", name: "Instagram", detail: "Follow along for updates, work and digital insights.", action: "FOLLOW ON INSTAGRAM", href: "https://www.instagram.com/jamesemmanuel4.453/", external: true },
];

export default function ContactPage() {
  return (
    <main className="site-shell contact-page" id="top">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="James home">JAMES<span>.</span></a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="/#expertise">Expertise</a>
          <a href="/#services">Services</a>
          <a href="/contact" aria-current="page">Contact</a>
        </nav>
        <a className="nav-cta" href="mailto:jamesmanuel966@gmail.com">EMAIL ME <span aria-hidden="true">↗</span></a>
      </header>

      <section className="contact-hero">
        <p className="eyebrow">LET&apos;S CONNECT</p>
        <h1>Have a project in mind?<br /><span>I&apos;d love to hear from you.</span></h1>
        <p>Whether you need a new website, e-commerce support or help with Google tools and tracking, choose the best way to reach me below.</p>
      </section>

      <section className="contact-method-grid" aria-label="Contact details">
        {contactMethods.map((item) => (
          <article className="contact-method-card" key={item.number}>
            <div className="service-card-heading">
              <span className="service-number">{item.number}</span>
              <span className="service-label">GET IN TOUCH</span>
            </div>
            <h2>{item.name}</h2>
            <p>{item.detail}</p>
            <a className="service-link" href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {item.action} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </section>

      <section className="contact-email-strip">
        <div>
          <p className="eyebrow">PREFER EMAIL?</p>
          <h2>jamesmanuel966@gmail.com</h2>
        </div>
        <a className="primary-button" href="mailto:jamesmanuel966@gmail.com">WRITE TO ME <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="footer">
        <a className="wordmark" href="/">JAMES<span>.</span></a>
        <p>© {new Date().getFullYear()} James. All rights reserved.</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

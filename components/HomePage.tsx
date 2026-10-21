import { Nav } from "@/components/Nav";
import { AgentDemo } from "@/components/AgentDemo";
import { Services } from "@/components/Services";
import { Estimator } from "@/components/Estimator";
import { Industries } from "@/components/Industries";
import { AuditForm } from "@/components/AuditForm";
import { Logo } from "@/components/Logo";
import { Showcase } from "@/components/Showcase";
import { Tools } from "@/components/Tools";
import { FloatingCta } from "@/components/FloatingCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Content } from "@/lib/content/en";
import { fill } from "@/lib/fill";
import { site } from "@/lib/site";

export function HomePage({ c }: { c: Content }) {
  const wa = `https://wa.me/${site.whatsapp}`;
  return (
    <>
      <Nav t={c.nav} brand={c.brand} alt={c.alt} />
      <main id="main">
        {/* Hero */}
        <section className="hero" id="top">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="hero__ar" lang={c.hero.kickerLang} dir={c.hero.kickerDir}>
                {c.hero.kicker}
              </p>
              <h1>
                <span className="hero__seo">{c.hero.seoLead}</span>
                {c.hero.title}
              </h1>
              <p className="hero__lede">{c.hero.lede}</p>
              <div className="hero__ctas">
                <a href="#audit" className="btn btn--primary">
                  {c.hero.primary}
                </a>
                <a href="#estimate" className="btn btn--ghost">
                  {c.hero.secondary}
                </a>
              </div>
            </div>
            <div className="hero__demo">
              <AgentDemo t={c.demo} />
            </div>
          </div>

          <div className="wrap">
            <ul className="facts">
              {c.facts.map((f) => (
                <li key={f.value}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Tools label={c.toolsLabel} />
        </section>

        <Services t={c.services} />
        <Showcase t={c.showcase} />
        <Estimator t={c.estimator} />

        {/* Process */}
        <section id="process" className="section section--deep">
          <div className="wrap">
            <div className="head" data-reveal>
              <h2>{c.process.title}</h2>
              <p>{c.process.text}</p>
            </div>
            <ol className="steps">
              {c.process.steps.map((s, i) => (
                <li key={s.title} className="step" data-reveal style={{ ["--i" as string]: i }}>
                  <span className="step__n" aria-hidden>
                    {i + 1}
                  </span>
                  <h3>{s.title}</h3>
                  <p className="step__time">{s.time}</p>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Industries t={c.industries} />

        {/* Principles */}
        <section className="section section--deep">
          <div className="wrap">
            <div className="head" data-reveal>
              <h2>{c.principles.title}</h2>
            </div>
            <div className="principles">
              {c.principles.items.map((p, i) => (
                <article key={p.title} className="principle" data-reveal style={{ ["--i" as string]: i % 2 }}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="packages" className="section section--sand">
          <div className="wrap">
            <div className="head" data-reveal>
              <h2>{c.plans.title}</h2>
              <p>{c.plans.text}</p>
            </div>
            <div className="plans">
              {c.plans.items.map((p, i) => (
                <article
                  key={p.name}
                  className={`plan ${p.featured ? "plan--featured" : ""}`}
                  data-reveal
                  style={{ ["--i" as string]: i }}
                >
                  <h3>{p.name}</h3>
                  <p className="plan__for">{p.for}</p>
                  <ul>
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <a href="#audit" className={`btn ${p.featured ? "btn--ink" : "btn--outline"} btn--block`}>
                    {fill(c.plans.cta, { x: p.name })}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About: plain-language summary with the main search terms */}
        <section id="about" className="section about">
          <div className="wrap about__grid">
            <h2 data-reveal>{c.about.title}</h2>
            <div className="about__body" data-reveal>
              {c.about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="about__areas-label">{c.about.areasLabel}</p>
              <ul className="about__areas">
                {c.about.areas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section">
          <div className="wrap faq">
            <div className="head">
              <h2>{c.faq.title}</h2>
              <p>
                {c.faq.more}{" "}
                <a className="link" href={wa} target="_blank" rel="noopener noreferrer">
                  {c.faq.whatsapp}
                </a>
                .
              </p>
            </div>
            <div className="faq__list">
              {c.faq.items.map((f) => (
                <details key={f.q} className="qa">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Audit */}
        <section id="audit" className="section audit">
          <div className="wrap audit__grid">
            <div className="audit__copy">
              <h2>{c.audit.title}</h2>
              <p>{c.audit.text}</p>
              <ul className="audit__list">
                {c.audit.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </div>
            <AuditForm t={c.audit.form} lang={c.lang} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div className="footer__brand">
            <a href="#top" className="brand" aria-label={c.nav.home}>
              <Logo />
              <span className="brand__name">{c.brand}</span>
              <span className="brand__ar" lang={c.brandAltLang}>
                {c.brandAlt}
              </span>
            </a>
            <p>{c.footer.tagline}</p>
          </div>
          <nav aria-label={c.footer.aria} className="footer__nav">
            {c.nav.links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="footer__contact">
            <a href={`mailto:${site.email}`} dir="ltr">
              {site.email}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              {c.footer.whatsappUs}
            </a>
            <span>{c.footer.location}</span>
            <a href={c.alt.href} hrefLang={c.alt.lang} lang={c.alt.lang}>
              {c.alt.label}
            </a>
          </div>
        </div>
        <div className="wrap footer__base">
          <span>
            © {new Date().getFullYear()} {c.brand}. {c.footer.rights}
          </span>
          <span className="credit" lang="en" dir="ltr">
            {c.footer.credit}
          </span>
        </div>
      </footer>
      <FloatingCta t={c.fcta} />
      <ScrollReveal />
    </>
  );
}

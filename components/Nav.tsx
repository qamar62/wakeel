"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content/en";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Nav({ t, brand, alt }: { t: Content["nav"]; brand: string; alt: Content["alt"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <span className="nav__progress" ref={bar} aria-hidden />
      <div className="wrap nav__inner">
        <a href="#top" className="brand" aria-label={t.home}>
          <Logo />
          <span className="brand__name">{brand}</span>
        </a>

        <nav className="nav__links" aria-label={t.mainAria}>
          {t.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href={alt.href} hrefLang={alt.lang} lang={alt.lang} className="nav__lang" aria-label={alt.aria}>
          {alt.label}
        </a>

        <ThemeToggle toDark={t.toDark} toLight={t.toLight} />

        <a href="#audit" className="btn btn--primary btn--sm nav__cta">
          {t.cta}
        </a>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? t.close : t.open}</span>
          <span className="nav__bars" data-open={open} aria-hidden />
        </button>
      </div>

      <div id="mobile-menu" className="mnav" data-open={open} hidden={!open}>
        <nav aria-label={t.mobileAria}>
          {t.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#audit" className="btn btn--primary" onClick={() => setOpen(false)}>
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}

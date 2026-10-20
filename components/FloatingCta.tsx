"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { Content } from "@/lib/content/en";

export function FloatingCta({ t }: { t: Content["fcta"] }) {
  const waText = encodeURIComponent(t.waText);
  const [past, setPast] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const form = document.getElementById("audit");
    let io: IntersectionObserver | undefined;
    if (form) {
      io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { threshold: 0.15 });
      io.observe(form);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = past && !atForm;

  return (
    <div className="fcta" data-show={show} aria-hidden={!show}>
      <a
        className="fcta__wa"
        href={`https://wa.me/${site.whatsapp}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 3.2c-4.9 0-8.8 3.7-8.8 8.3 0 1.8.6 3.5 1.7 4.9L4 20.6l4.4-1.3c1.1.5 2.3.7 3.6.7 4.9 0 8.8-3.7 8.8-8.3S16.9 3.2 12 3.2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 8.6c.2-.4.5-.4.8-.4h.4c.2 0 .3.1.4.3l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.1-.1.3 0 .4.6 1 1.4 1.7 2.4 2.2.1.1.3 0 .4-.1l.5-.6c.1-.2.3-.2.5-.1l1.4.7c.2.1.3.2.3.4 0 .5-.2 1.1-.7 1.4-.5.3-1.2.4-2 .1-1.5-.5-3-1.7-3.9-3.1-.7-1-.9-2-.6-2.9Z"
            fill="currentColor"
          />
        </svg>
        <span>{t.wa}</span>
      </a>
      <a href="#audit" className="btn btn--primary fcta__audit" tabIndex={show ? 0 : -1}>
        {t.audit}
      </a>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import type { Content } from "@/lib/content/en";
import { fill } from "@/lib/fill";

export function Industries({ t }: { t: Content["industries"] }) {
  const industries = t.items;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent, i: number) {
    const rtl = document.documentElement.dir === "rtl";
    const next = e.key === "ArrowDown" || e.key === (rtl ? "ArrowLeft" : "ArrowRight");
    const prev = e.key === "ArrowUp" || e.key === (rtl ? "ArrowRight" : "ArrowLeft");
    if (!next && !prev) return;
    e.preventDefault();
    const n = (i + (next ? 1 : -1) + industries.length) % industries.length;
    setActive(n);
    tabs.current[n]?.focus();
  }

  const cur = industries[active];

  return (
    <section id="industries" className="section">
      <div className="wrap ind">
        <div className="head" data-reveal>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>

        <div className="ind__grid">
          <div className="ind__tabs" role="tablist" aria-label={t.tabsAria} aria-orientation="vertical">
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${ind.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${ind.id}`}
                tabIndex={i === active ? 0 : -1}
                className="ind__tab"
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {ind.label}
              </button>
            ))}
          </div>

          <div className="ind__panel" role="tabpanel" id={`panel-${cur.id}`} aria-labelledby={`tab-${cur.id}`} key={cur.id}>
            <h3>{cur.label}</h3>
            <ul>
              {cur.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <a href="#audit" className="link">
              {fill(t.cta, { x: cur.label.toLowerCase() })}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

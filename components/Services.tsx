"use client";

import { useRef, useState } from "react";
import type { Content } from "@/lib/content/en";
import { fill } from "@/lib/fill";

export function Services({ t }: { t: Content["services"] }) {
  const groups = t.groups;
  const [group, setGroup] = useState(0);
  const [open, setOpen] = useState<number[]>(groups.map(() => 0));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const g = groups[group];

  function toggle(i: number) {
    setOpen((o) => o.map((v, gi) => (gi === group ? (v === i ? -1 : i) : v)));
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const rtl = document.documentElement.dir === "rtl";
    const step = (e.key === "ArrowRight") !== rtl ? 1 : -1;
    const n = (i + step + groups.length) % groups.length;
    setGroup(n);
    tabs.current[n]?.focus();
  }

  return (
    <section id="services" className="section">
      <div className="wrap">
        <div className="head" data-reveal>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>

        <div className="svc__switch" role="tablist" aria-label={t.groupsAria}>
          {groups.map((sg, i) => (
            <button
              key={sg.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`svc-tab-${sg.id}`}
              aria-selected={i === group}
              aria-controls={`svc-panel-${sg.id}`}
              tabIndex={i === group ? 0 : -1}
              className="svc__switch-btn"
              onClick={() => setGroup(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span>{sg.label}</span>
              <small>{fill(t.count, { n: sg.items.length })}</small>
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`svc-panel-${g.id}`} aria-labelledby={`svc-tab-${g.id}`} key={g.id} className="svc__group">
          <p className="svc__intro">{g.intro}</p>
          <ul className="svc">
            {g.items.map((s, i) => {
              const isOpen = open[group] === i;
              return (
                <li key={s.title} className="svc__row" data-open={isOpen}>
                  <h3>
                    <button
                      className="svc__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`svc-${g.id}-${i}`}
                      onClick={() => toggle(i)}
                    >
                      <span className="svc__title">{s.title}</span>
                      <span className="svc__short">{s.short}</span>
                      <span className="svc__icon" aria-hidden />
                    </button>
                  </h3>
                  <div id={`svc-${g.id}-${i}`} className="svc__panel" role="region" aria-label={s.title} hidden={!isOpen}>
                    <ul className="svc__does">
                      {s.does.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <p className="svc__replaces">
                      <span>{t.replaces}</span>
                      {s.replaces}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

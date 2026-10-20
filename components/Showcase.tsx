"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { Content } from "@/lib/content/en";
import { fill } from "@/lib/fill";

type T = Content["showcase"];
type Reduce = boolean | null;

function useCountUp(target: number, run: boolean, reduce: Reduce) {
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, reduce]);
  return n;
}

function Kpi({ k, t, run, reduce }: { k: T["kpis"][number]; t: T; run: boolean; reduce: Reduce }) {
  const n = useCountUp(k.value, run, reduce);
  const [before, after] = t.vsLast.split("{d}");
  return (
    <div className="sc-kpi">
      <span>{k.label}</span>
      <strong>
        {n}
        {k.suffix}
      </strong>
      <em>
        {before}
        <bdi dir={/^[+\-\d]/.test(k.delta) ? "ltr" : undefined}>{k.delta}</bdi>
        {after}
      </em>
    </div>
  );
}

/* ---------- CRM pipeline ---------- */

function Crm({ t, playing, reduce }: { t: T; playing: boolean; reduce: Reduce }) {
  const frames = t.frames;
  const [f, setF] = useState(reduce ? frames.length - 1 : 0);
  useEffect(() => {
    if (!playing || reduce) return;
    const id = setTimeout(() => setF((n) => (n + 1) % frames.length), f === frames.length - 1 ? 3600 : 2400);
    return () => clearTimeout(id);
  }, [f, playing, reduce, frames.length]);
  const frame = frames[f];
  const at = frame.at as Record<number, number>;

  return (
    <div className="sc-crm">
      <LayoutGroup>
        <div className="sc-board">
          {t.stages.map((st, si) => {
            const col = t.leads.filter((l) => at[l.id] === si);
            const total = col.reduce((a, l) => a + l.value, 0);
            return (
              <div key={st} className="sc-col">
                <div className="sc-col__head">
                  <span>{st}</span>
                  <small>{fill(t.colSummary, { count: col.length, money: fill(t.money, { n: total }) })}</small>
                </div>
                <ul>
                  {col.map((l) => (
                    <motion.li
                      key={l.id}
                      layoutId={`lead-${l.id}`}
                      layout
                      className="sc-card"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    >
                      <strong>{l.name}</strong>
                      <span className="sc-card__row">
                        <span className={`sc-tag sc-tag--${l.kind}`}>{l.src}</span>
                        <span>{fill(t.money, { n: l.value })}</span>
                      </span>
                      <span className="sc-score" style={{ ["--s" as string]: `${l.score}%` }}>
                        <i />
                        {fill(t.score, { n: l.score })}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </LayoutGroup>
      <div className="sc-activity" aria-hidden>
        <span className="sc-pulse" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={f}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {frame.note}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Owner dashboard ---------- */

function Dash({ t, playing, reduce }: { t: T; playing: boolean; reduce: Reduce }) {
  const week = t.week;
  const max = Math.max(...week.map((w) => w.ai + w.staff));
  const aiShare = Math.round((week.reduce((a, w) => a + w.ai, 0) / week.reduce((a, w) => a + w.ai + w.staff, 0)) * 100);
  const grow = playing || reduce ? 1 : 0;
  return (
    <div className="sc-dash">
      <div className="sc-kpis">
        {t.kpis.map((k) => (
          <Kpi key={k.label} k={k} t={t} run={playing} reduce={reduce} />
        ))}
      </div>
      <div className="sc-dash__row">
        <div className="sc-chart">
          <div className="sc-chart__head">
            <span>{t.chartTitle}</span>
            <span className="sc-legend">
              <i className="ai" /> {t.legendAi} <i className="staff" /> {t.legendStaff}
            </span>
          </div>
          <div className="sc-bars" role="img" aria-label={fill(t.chartAria, { n: aiShare })}>
            {week.map((w, i) => (
              <div key={w.d} className="sc-bar">
                <div className="sc-bar__stack" style={{ height: `${((w.ai + w.staff) / max) * 100}%` }}>
                  <motion.span
                    className="staff"
                    style={{ flexGrow: w.staff }}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={{ scaleY: grow }}
                    transition={{ delay: 0.05 * i + 0.2, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                  <motion.span
                    className="ai"
                    style={{ flexGrow: w.ai }}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={{ scaleY: grow }}
                    transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                </div>
                <small>{w.d}</small>
              </div>
            ))}
          </div>
          <p className="sc-chart__foot">
            <strong>{aiShare}%</strong> {t.chartFoot}
          </p>
        </div>
        <div className="sc-attn">
          <p className="sc-attn__title">{t.attentionTitle}</p>
          <ul>
            {t.attention.map((a) => (
              <li key={a.text} data-tone={a.tone}>
                {a.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Customer portal ---------- */

function Portal({ t, playing, reduce }: { t: T; playing: boolean; reduce: Reduce }) {
  const doneCount = 3;
  return (
    <div className="sc-portal">
      <div className="sc-trip">
        <p className="sc-trip__id">{t.tripId}</p>
        <h4>{t.tripTitle}</h4>
        <ol className="sc-steps">
          {t.timeline.map((s, i) => {
            const state = i < doneCount ? "done" : i === doneCount ? "now" : "next";
            return (
              <motion.li
                key={s.label}
                data-state={state}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={playing || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ delay: 0.15 * i, duration: 0.35 }}
              >
                <strong>{s.label}</strong>
                <span>{s.sub}</span>
              </motion.li>
            );
          })}
        </ol>
      </div>
      <div className="sc-side">
        <div className="sc-docs">
          <p className="sc-attn__title">{t.docsTitle}</p>
          <ul>
            {t.docs.map((d) => (
              <li key={d.name}>
                {d.name} <span className={d.todo ? "todo" : undefined}>{d.status}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sc-mini-chat" dir={t.chatDir} lang={t.chatLang}>
          <p className="bubble bubble--customer">{t.chatCustomer}</p>
          <p className="bubble bubble--agent">{t.chatAgent}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export function Showcase({ t }: { t: T }) {
  const views = t.views;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Rotate through the screens until the visitor picks one.
  useEffect(() => {
    if (!auto || !visible || reduce) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % views.length), active === 0 ? 15000 : 8000);
    return () => clearTimeout(id);
  }, [active, auto, visible, reduce, views.length]);

  function pick(i: number) {
    setAuto(false);
    setActive(i);
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const rtl = document.documentElement.dir === "rtl";
    const step = (e.key === "ArrowRight") !== rtl ? 1 : -1;
    const n = (i + step + views.length) % views.length;
    pick(n);
    tabs.current[n]?.focus();
  }

  const v = views[active];

  return (
    <section id="showcase" className="section section--deep">
      <div className="wrap">
        <div className="sc-head">
          <div className="head" data-reveal>
            <h2>{t.title}</h2>
            <p>{t.text}</p>
          </div>
          <div className="sc-tabs" role="tablist" aria-label={t.tabsAria}>
            {views.map((vw, i) => (
              <button
                key={vw.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`sc-tab-${vw.id}`}
                aria-selected={i === active}
                aria-controls="sc-panel"
                tabIndex={i === active ? 0 : -1}
                className="sc-tab"
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {vw.label}
                {i === active && auto && visible && !reduce && (
                  <span
                    className="sc-tab__timer"
                    key={`t-${active}`}
                    style={{ animationDuration: active === 0 ? "15s" : "8s" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="sc-frame" ref={root} data-reveal>
          <div className="sc-chrome" aria-hidden>
            <span className="sc-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="sc-url" dir="ltr">
              {t.urlBase}
              {v.path}
            </span>
            <span className="sc-user">
              <i>{v.user.slice(0, 1)}</i> {v.user}
            </span>
          </div>
          <div className="sc-screen" role="tabpanel" id="sc-panel" aria-labelledby={`sc-tab-${v.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={v.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {v.id === "crm" && <Crm t={t} playing={visible} reduce={reduce} />}
                {v.id === "dash" && <Dash t={t} playing={visible} reduce={reduce} />}
                {v.id === "portal" && <Portal t={t} playing={visible} reduce={reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="sc-foot">
          <p>{v.caption}</p>
          <p className="sc-note">{t.note}</p>
        </div>
      </div>
    </section>
  );
}

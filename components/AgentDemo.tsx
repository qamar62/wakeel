"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Content } from "@/lib/content/en";
import { fill } from "@/lib/fill";

export function AgentDemo({ t }: { t: Content["demo"] }) {
  const scenarios = t.scenarios;
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  const s = scenarios[idx];
  const total = s.thread.length;
  const shown = reduce ? total : step;

  // Only play while on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    let t: ReturnType<typeof setTimeout>;
    if (step < total) {
      const next = s.thread[step];
      if (next.from === "agent" && !typing) {
        t = setTimeout(() => setTyping(true), 500);
      } else if (next.from === "agent" && typing) {
        t = setTimeout(() => {
          setTyping(false);
          setStep((n) => n + 1);
        }, 1500);
      } else {
        t = setTimeout(() => setStep((n) => n + 1), step === 0 ? 700 : 1400);
      }
    } else if (auto) {
      t = setTimeout(() => select((idx + 1) % scenarios.length, true), 5200);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, typing, idx, auto, reduce, visible]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [step, typing, reduce]);

  function select(i: number, fromAuto = false) {
    if (!fromAuto) setAuto(false);
    setIdx(i);
    setStep(0);
    setTyping(false);
  }

  const done = s.actions.filter((a) => a.at < shown);
  const needsHuman = s.actions.some((a) => a.human);
  const finished = shown >= total;

  return (
    <div className="demo" ref={root}>
      <div className="demo__tabs" role="tablist" aria-label={t.tabsAria}>
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            role="tab"
            aria-selected={i === idx}
            className="demo__tab"
            onClick={() => select(i)}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className="demo__body">
        <div className="chat" aria-live="polite">
          <div className="chat__head">
            <span className="chat__avatar" aria-hidden>
              {s.contact.slice(0, 1)}
            </span>
            <span>
              <strong>{s.contact}</strong>
              <small>{s.channel}</small>
            </span>
          </div>
          <div className="chat__thread" ref={threadRef}>
            <AnimatePresence initial={false} mode="popLayout">
              {s.thread.slice(0, shown).map((b, i) => (
                <motion.p
                  key={`${s.id}-${i}`}
                  className={`bubble bubble--${b.from}`}
                  dir={b.rtl ? "rtl" : "ltr"}
                  lang={b.rtl ? "ar" : "en"}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {b.text}
                </motion.p>
              ))}
              {typing && (
                <motion.span
                  key="typing"
                  className="bubble bubble--agent bubble--typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-label={t.typing}
                >
                  <i />
                  <i />
                  <i />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="ledger">
          <p className="ledger__title">{t.agentDid}</p>
          <ol className="ledger__list">
            <AnimatePresence initial={false}>
              {done.map((a) => (
                <motion.li
                  key={`${s.id}-${a.text}`}
                  className={a.human ? "ledger__item ledger__item--human" : "ledger__item"}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {a.text}
                </motion.li>
              ))}
            </AnimatePresence>
            {done.length === 0 && <li className="ledger__empty">{t.waiting}</li>}
          </ol>
          <dl className="ledger__stats" data-on={finished}>
            <div>
              <dt>{t.firstReply}</dt>
              <dd>{fill(t.seconds, { n: s.replySeconds })}</dd>
            </div>
            <div>
              <dt>{t.staffTime}</dt>
              <dd>{needsHuman ? t.approve : t.none}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

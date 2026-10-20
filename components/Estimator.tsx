"use client";

import { useId, useState } from "react";
import type { Content } from "@/lib/content/en";

const HOURS_PER_FTE = 176; // monthly working hours for one full-time person

function Slider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const pct = ((props.value - props.min) / (props.max - props.min)) * 100;
  return (
    <div className="field">
      <div className="field__top">
        <label htmlFor={id}>{props.label}</label>
        <output htmlFor={id}>
          {props.value}
          <span>{props.unit}</span>
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        style={{ ["--pct" as string]: `${pct}%` }}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function Estimator({ t }: { t: Content["estimator"] }) {
  const [enquiries, setEnquiries] = useState(80);
  const [minutes, setMinutes] = useState(8);
  const [share, setShare] = useState(65);

  const monthlyHours = (enquiries * 30 * minutes) / 60;
  const saved = Math.round((monthlyHours * share) / 100);
  const people = saved / HOURS_PER_FTE;

  return (
    <section id="estimate" className="section section--sand">
      <div className="wrap est">
        <div className="est__intro">
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>

        <div className="est__card">
          <div className="est__inputs">
            <Slider
              label={t.enquiries}
              value={enquiries}
              min={5}
              max={500}
              step={5}
              unit=""
              onChange={setEnquiries}
            />
            <Slider
              label={t.minutes}
              value={minutes}
              min={1}
              max={30}
              step={1}
              unit={t.minUnit}
              onChange={setMinutes}
            />
            <Slider
              label={t.share}
              value={share}
              min={30}
              max={85}
              step={5}
              unit="%"
              onChange={setShare}
            />
          </div>

          <div className="est__result" aria-live="polite">
            <p className="est__big">
              {saved.toLocaleString("en-US")}
              <span> {t.hours}</span>
            </p>
            <p className="est__sub">
              {t.subBefore} <strong>{people < 0.1 ? t.fewHours : people.toFixed(1)}</strong>{" "}
              {people >= 0.1 && (people >= 0.95 && people < 1.05 ? t.person : t.people)}
              {t.subAfter}
            </p>
            <a href="#audit" className="btn btn--ink">
              {t.cta}
            </a>
            <p className="est__note">{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

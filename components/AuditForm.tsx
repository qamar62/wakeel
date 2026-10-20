"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import type { Content } from "@/lib/content/en";

type Status = "idle" | "sending" | "sent" | "error";

export function AuditForm({ t, lang }: { t: Content["audit"]["form"]; lang: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form).entries()), lang };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json.code === "missing" ? t.errMissing : json.code === "phone" ? t.errPhone : t.errGeneric;
        throw new Error(msg);
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : t.errGeneric);
    }
  }

  if (status === "sent") {
    return (
      <div className="form form--done" role="status">
        <h3>{t.doneTitle}</h3>
        <p>{t.doneText}</p>
        <button className="btn btn--ghost" onClick={() => setStatus("idle")}>
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <label>
          {t.name}
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          {t.company}
          <input name="company" required autoComplete="organization" />
        </label>
      </div>
      <div className="form__row">
        <label>
          {t.phone}
          <input
            name="phone"
            type="tel"
            dir="ltr"
            required
            autoComplete="tel"
            placeholder={t.phonePh}
            pattern="[+0-9 ()-]{8,20}"
          />
        </label>
        <label>
          {t.industry}
          <select name="industry" defaultValue="" required>
            <option value="" disabled>
              {t.choose}
            </option>
            {t.industries.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        {t.interest}
        <select name="interest" defaultValue="Not sure yet">
          {t.interests.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t.message}
        <textarea name="message" rows={3} placeholder={t.messagePh} />
      </label>
      {/* Honeypot for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

      {status === "error" && (
        <p className="form__error" role="alert">
          {error} {t.errAlt}{" "}
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
            {t.whatsapp}
          </a>
          .
        </p>
      )}

      <button className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>
      <p className="form__fine">{t.fine}</p>
    </form>
  );
}

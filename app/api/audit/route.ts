import { NextResponse } from "next/server";

// Forwards audit requests to a webhook (an n8n workflow, a CRM or a Slack/Telegram bot).
// Set AUDIT_WEBHOOK_URL in .env.local. Without it, requests are only logged on the server.
// Errors return a `code` so the form can show the message in the visitor's language.

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: "bad_request", error: "The form data could not be read." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    phone: clean(body.phone, 30),
    industry: clean(body.industry, 60),
    interest: clean(body.interest, 80),
    message: clean(body.message, 2000),
    language: clean(body.lang, 5) === "ar" ? "ar" : "en", // reply to the lead in this language
    receivedAt: new Date().toISOString(),
    source: "website-audit-form",
  };

  if (!lead.name || !lead.company || !lead.phone) {
    return NextResponse.json({ code: "missing", error: "Add your name, company and WhatsApp number." }, { status: 422 });
  }
  if (!/^[+0-9 ()-]{8,20}$/.test(lead.phone)) {
    return NextResponse.json(
      { code: "phone", error: "Check the WhatsApp number format, for example +971 50 000 0000." },
      { status: 422 },
    );
  }

  const hook = process.env.AUDIT_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
    } catch (e) {
      console.error("[audit] webhook failed", e);
      return NextResponse.json({ code: "send_failed", error: "The request could not be sent right now." }, { status: 502 });
    }
  } else {
    console.info("[audit] new request", lead);
  }

  return NextResponse.json({ ok: true });
}

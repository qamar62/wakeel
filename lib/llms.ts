// Builds /llms.txt (short guide) and /llms-full.txt (all page content) for AI assistants,
// following the llmstxt.org format. Both are generated from the same content as the pages.
import { ar } from "@/lib/content/ar";
import type { Content } from "@/lib/content/en";
import { en } from "@/lib/content/en";
import { site } from "@/lib/site";

const home = `${site.url}/`;
const arUrl = `${site.url}/ar`;
const wa = `https://wa.me/${site.whatsapp}`;

export function llmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${site.name} (${site.nameAr})`, "");
  lines.push(`> ${en.meta.description}`, "");
  lines.push(...en.about.paragraphs.flatMap((p) => [p, ""]));
  lines.push(
    `Languages: English and Arabic. Based in Dubai, serving: ${en.about.areas.join(", ")}.`,
    `Contact: ${site.email} · WhatsApp ${wa} · Free 45-minute audit: ${home}#audit`,
    "",
  );

  lines.push("## Pages", "");
  lines.push(`- [Home (English)](${home}): services, sample screens, hours-saved estimate, process, industries, plans, FAQ and audit booking`);
  lines.push(`- [الصفحة الرئيسية (العربية)](${arUrl}): the same page in Arabic, right to left`);
  lines.push(`- [Full text for AI assistants](${site.url}/llms-full.txt): every section of both pages as plain text`, "");

  for (const g of en.services.groups) {
    lines.push(`## ${g.label}`, "");
    for (const s of g.items) lines.push(`- **${s.title}**: ${s.short}`);
    lines.push("");
  }

  lines.push("## Industries", "");
  for (const ind of en.industries.items) lines.push(`- **${ind.label}**: ${ind.items.join("; ")}`);
  lines.push("");

  lines.push("## How engagements work", "");
  en.process.steps.forEach((s, i) => lines.push(`${i + 1}. **${s.title}** (${s.time}): ${s.text}`));
  lines.push("");

  lines.push("## Plans", "");
  for (const p of en.plans.items) lines.push(`- **${p.name}** (${p.for}): ${p.items.join(", ")}`);
  lines.push(`- ${en.plans.text}`, "");

  lines.push("## Optional", "");
  lines.push(`- [Sitemap](${site.url}/sitemap.xml)`);
  lines.push(`- [Frequently asked questions](${home}#faq)`);
  return lines.join("\n") + "\n";
}

function fullSection(c: Content, url: string): string[] {
  const L: string[] = [];
  L.push(`# ${c.meta.title}`, "", `URL: ${url}`, `Language: ${c.lang === "ar" ? "Arabic" : "English"}`, "");
  L.push(`> ${c.meta.description}`, "");
  L.push(`## ${c.hero.seoLead}`, "", c.hero.title, "", c.hero.lede, "");
  L.push(...c.facts.map((f) => `- ${f.value}: ${f.label}`), "");

  L.push(`## ${c.about.title}`, "", ...c.about.paragraphs.flatMap((p) => [p, ""]));
  L.push(`${c.about.areasLabel}: ${c.about.areas.join(", ")}`, "");

  L.push(`## ${c.services.title}`, "", c.services.text, "");
  for (const g of c.services.groups) {
    L.push(`### ${g.label}`, "", g.intro, "");
    for (const s of g.items) {
      L.push(`#### ${s.title}`, "", s.short, "");
      L.push(...s.does.map((d) => `- ${d}`));
      L.push("", `${c.services.replaces}: ${s.replaces}`, "");
    }
  }

  L.push(`## ${c.process.title}`, "", c.process.text, "");
  c.process.steps.forEach((s, i) => L.push(`${i + 1}. ${s.title} (${s.time}): ${s.text}`));
  L.push("");

  L.push(`## ${c.industries.title}`, "", c.industries.text, "");
  for (const ind of c.industries.items) {
    L.push(`### ${ind.label}`, "", ...ind.items.map((x) => `- ${x}`), "");
  }

  L.push(`## ${c.principles.title}`, "");
  for (const p of c.principles.items) L.push(`- **${p.title}**: ${p.text}`);
  L.push("");

  L.push(`## ${c.plans.title}`, "", c.plans.text, "");
  for (const p of c.plans.items) L.push(`### ${p.name}`, "", p.for, "", ...p.items.map((x) => `- ${x}`), "");

  L.push(`## ${c.faq.title}`, "");
  for (const f of c.faq.items) L.push(`### ${f.q}`, "", f.a, "");

  L.push(`## ${c.audit.title}`, "", c.audit.text, "", ...c.audit.list.map((x) => `- ${x}`), "");
  L.push(`Email: ${site.email}`, `WhatsApp: ${wa}`, `${c.footer.location}`, "");
  return L;
}

export function llmsFullTxt(): string {
  return [...fullSection(en, home), "---", "", ...fullSection(ar, arUrl)].join("\n") + "\n";
}

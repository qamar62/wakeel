import type { Metadata, Viewport } from "next";
import type { Content } from "@/lib/content/en";
import { site } from "@/lib/site";

const languages = { en: "/", ar: "/ar", "x-default": "/" };
const PLACEHOLDER_WHATSAPP = "971500000000";

export const pageUrl = (path: string) => (path === "/" ? `${site.url}/` : `${site.url}${path}`);

export function buildMetadata(c: Content): Metadata {
  const image = { url: `/og-${c.lang}.png`, width: 1200, height: 630, alt: c.meta.ogAlt };
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  return {
    metadataBase: new URL(site.url),
    title: { default: c.meta.title, template: c.meta.titleTemplate },
    description: c.meta.description,
    keywords: c.meta.keywords,
    applicationName: c.brand,
    category: "technology",
    creator: site.name,
    publisher: site.name,
    alternates: { canonical: c.path, languages },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      url: c.path,
      siteName: c.brand,
      title: c.meta.title,
      description: c.meta.description,
      locale: c.ogLocale,
      alternateLocale: c.lang === "ar" ? ["en_AE"] : ["ar_AE"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description, images: [image] },
    verification: {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    },
    other: { "llms-txt": `${site.url}/llms.txt` },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  width: "device-width",
  initialScale: 1,
};

// One connected graph: the business, the website, this page, its services and its FAQ.
export function JsonLd({ c }: { c: Content }) {
  const home = `${site.url}/`;
  const url = pageUrl(c.path);
  const org = `${home}#organization`;
  const telephone = site.whatsapp !== PLACEHOLDER_WHATSAPP ? `+${site.whatsapp}` : undefined;

  const graph = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": org,
      name: site.name,
      alternateName: site.nameAr,
      url: home,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
      image: `${site.url}/og-en.png`,
      email: site.email,
      ...(telephone ? { telephone } : {}),
      description: c.meta.description,
      slogan: c.hero.seoLead,
      address: { "@type": "PostalAddress", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        ...c.about.areas.map((name) => ({ "@type": "City", name })),
      ],
      knowsLanguage: ["ar", "en"],
      knowsAbout: c.meta.serviceTypes,
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: c.services.title,
        itemListElement: c.services.groups.map((g) => ({
          "@type": "OfferCatalog",
          name: g.label,
          itemListElement: g.items.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.short,
              serviceType: s.title,
              provider: { "@id": org },
              areaServed: { "@type": "Country", name: "United Arab Emirates" },
              availableLanguage: ["ar", "en"],
            },
          })),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      url: home,
      name: site.name,
      alternateName: site.nameAr,
      inLanguage: ["en", "ar"],
      publisher: { "@id": org },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: c.meta.title,
      description: c.meta.description,
      inLanguage: c.lang,
      isPartOf: { "@id": `${home}#website` },
      about: { "@id": org },
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/og-${c.lang}.png` },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: c.lang,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntity: c.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const data = { "@context": "https://schema.org", "@graph": graph };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

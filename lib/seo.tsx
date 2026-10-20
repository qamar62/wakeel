import type { Metadata, Viewport } from "next";
import type { Content } from "@/lib/content/en";
import { site } from "@/lib/site";

const languages = { en: "/", ar: "/ar", "x-default": "/" };

export function buildMetadata(c: Content): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: c.meta.title, template: c.meta.titleTemplate },
    description: c.meta.description,
    keywords: c.meta.keywords,
    alternates: { canonical: c.path, languages },
    openGraph: {
      type: "website",
      url: c.path,
      siteName: c.brand,
      title: c.meta.title,
      description: c.meta.description,
      locale: c.ogLocale,
      alternateLocale: c.lang === "ar" ? ["en_AE"] : ["ar_AE"],
    },
    twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  width: "device-width",
  initialScale: 1,
};

export function JsonLd({ c }: { c: Content }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: c.brand,
    alternateName: c.brandAlt,
    url: new URL(c.path, site.url).toString(),
    email: site.email,
    description: c.meta.description,
    inLanguage: c.lang,
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    knowsLanguage: ["ar", "en"],
    serviceType: c.meta.serviceTypes,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

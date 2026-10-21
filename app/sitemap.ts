import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/`, ar: `${site.url}/ar` };
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages }, images: [`${site.url}/og-en.png`] },
    { url: `${site.url}/ar`, lastModified, changeFrequency: "weekly", priority: 1, alternates: { languages }, images: [`${site.url}/og-ar.png`] },
  ];
}

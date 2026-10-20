import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/`, ar: `${site.url}/ar` };
  return [
    { url: `${site.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/ar`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
  ];
}

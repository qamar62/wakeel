import type { MetadataRoute } from "next";
import { en } from "@/lib/content/en";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.nameAr}`,
    short_name: site.name,
    description: en.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#fbf8f1",
    theme_color: "#fbf8f1",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

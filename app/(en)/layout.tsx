import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "../globals.css";
import { en } from "@/lib/content/en";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { themeScript } from "@/lib/theme";

export const metadata = buildMetadata(en);
export { viewport } from "@/lib/seo";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {en.skip}
        </a>
        {children}
        <JsonLd c={en} />
      </body>
    </html>
  );
}

import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "../globals.css";
import { ar } from "@/lib/content/ar";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { themeScript } from "@/lib/theme";

export const metadata = buildMetadata(ar);
export { viewport } from "@/lib/seo";

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {ar.skip}
        </a>
        {children}
        <JsonLd c={ar} />
      </body>
    </html>
  );
}

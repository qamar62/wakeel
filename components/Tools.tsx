// A strip of everyday business tools our agents and systems connect to.
const tools = [
  "WhatsApp Business",
  "Instagram",
  "Google Workspace",
  "Microsoft 365",
  "Outlook",
  "HubSpot",
  "Zoho",
  "Salesforce",
  "Odoo",
  "QuickBooks",
  "Xero",
  "Shopify",
  "WooCommerce",
  "Stripe",
  "Telr",
  "Tabby",
  "Bayut",
  "Property Finder",
  "Google Sheets",
  "Slack",
];

export function Tools({ label }: { label: string }) {
  return (
    <div className="tools" aria-label={label}>
      <p className="tools__label">{label}</p>
      <div className="tools__track" dir="ltr">
        {[0, 1].map((n) => (
          <ul key={n} aria-hidden={n === 1 || undefined}>
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

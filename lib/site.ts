// Single place to change the brand, contact details and copy.
export const site = {
  name: "Wakeel",
  nameAr: "وكيل",
  url: "https://wakeel.ae", // replace with the real domain
  email: "hello@wakeel.ae",
  whatsapp: "971500000000", // international format, digits only
  location: "Dubai, United Arab Emirates",
  description:
    "AI agents, automation and custom software for UAE businesses: WhatsApp, web and voice agents, CRMs, dashboards, websites, apps and the servers they run on, in Arabic and English.",
};

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#showcase", label: "What you get" },
  { href: "#estimate", label: "Estimate" },
  { href: "#process", label: "How we work" },
  { href: "#industries", label: "Industries" },
  { href: "#faq", label: "FAQ" },
];

export type Bubble = { from: "customer" | "agent"; text: string; rtl?: boolean };
export type Scenario = {
  id: string;
  label: string;
  channel: string;
  contact: string;
  thread: Bubble[];
  actions: { at: number; text: string; human?: boolean }[]; // at = index of bubble after which it appears
  replySeconds: number;
};

export const scenarios: Scenario[] = [
  {
    id: "clinic",
    label: "Clinic",
    channel: "WhatsApp",
    contact: "New patient",
    replySeconds: 6,
    thread: [
      { from: "customer", rtl: true, text: "مرحبا، عندكم موعد مع طبيب جلدية هالأسبوع؟" },
      { from: "agent", rtl: true, text: "أهلاً وسهلاً! د. رنا متاحة يوم الخميس الساعة ٤:٣٠ أو السبت الساعة ١١:٠٠. أي وقت يناسبك؟" },
      { from: "customer", rtl: true, text: "الخميس لو سمحت" },
      { from: "agent", rtl: true, text: "تم الحجز يوم الخميس ٤:٣٠ مساءً مع د. رنا. أرسلت لك موقع العيادة، وبنذكّرك قبل الموعد بيوم." },
    ],
    actions: [
      { at: 0, text: "Recognised Gulf Arabic and replied in Arabic" },
      { at: 1, text: "Checked the clinic calendar: 2 free slots" },
      { at: 3, text: "Booked Thursday 4:30 pm with Dr. Rana" },
      { at: 3, text: "Created the patient record in the CRM" },
      { at: 3, text: "Scheduled a reminder for Wednesday" },
    ],
  },
  {
    id: "realestate",
    label: "Real estate",
    channel: "WhatsApp",
    contact: "Listing enquiry",
    replySeconds: 9,
    thread: [
      { from: "customer", text: "Hi, saw your 2BR in JVC. Still available? Budget around 95k." },
      { from: "agent", text: "Yes, it's available at AED 92,000 a year on 2 cheques. Would a viewing tomorrow at 6 pm or Saturday morning suit you?" },
      { from: "customer", text: "Tomorrow 6 works" },
      { from: "agent", text: "Booked. Ahmed from our team will meet you in the lobby. I've sent you the location and unit photos." },
    ],
    actions: [
      { at: 0, text: "Matched the enquiry to listing JVC-2BR-114" },
      { at: 0, text: "Scored the lead as hot: budget fits, ready to view" },
      { at: 3, text: "Booked the viewing in Ahmed's calendar" },
      { at: 3, text: "Notified Ahmed with the lead summary" },
      { at: 3, text: "Logged the conversation in the CRM" },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    channel: "Website chat",
    contact: "Package enquiry",
    replySeconds: 11,
    thread: [
      { from: "customer", text: "Need a Georgia trip for 4 people, 5 nights, end of December." },
      { from: "agent", text: "Good timing for snow. I can send two options: Tbilisi only, or Tbilisi plus Gudauri, both with hotel, transfers and visa support. Shall I prepare both?" },
      { from: "customer", text: "Yes please" },
      { from: "agent", text: "Both quotes are on your WhatsApp now. A travel consultant will confirm availability within 30 minutes." },
    ],
    actions: [
      { at: 0, text: "Captured 4 travellers, 5 nights, late December" },
      { at: 1, text: "Pulled 2 package templates with live hotel rates" },
      { at: 3, text: "Generated both quotations as PDF" },
      { at: 3, text: "Sent to a consultant to confirm before booking", human: true },
    ],
  },
];

export const services = [
  {
    title: "WhatsApp and web chat agents",
    short: "Answer every enquiry in Arabic and English, qualify leads and book appointments.",
    does: [
      "Replies in under a minute, at 3 am as well as 3 pm",
      "Asks the questions your best salesperson would ask",
      "Books into your calendar and logs everything in your CRM",
      "Hands the chat to a person when it should",
    ],
    replaces: "Missed messages, slow replies and copy-pasting leads into spreadsheets.",
  },
  {
    title: "Voice agents",
    short: "Phone agents that take bookings, confirm appointments and make follow-up calls.",
    does: [
      "Answers calls when the line is busy or the office is closed",
      "Calls customers to confirm, remind or collect feedback",
      "Speaks Arabic, English, Hindi and Urdu",
      "Sends a written summary of every call to your team",
    ],
    replaces: "Missed calls, no-shows and hours of reminder calls.",
  },
  {
    title: "Workflow automation",
    short: "Connect your CRM, email, accounting and WhatsApp so work moves on its own.",
    does: [
      "Quotes and invoices created from a single message",
      "Payment reminders that stop when the customer pays",
      "Daily and weekly reports sent to managers automatically",
      "Data entered once, updated everywhere",
    ],
    replaces: "Double entry, chasing payments and building reports by hand.",
  },
  {
    title: "Document and data processing",
    short: "Read invoices, passports, contracts and purchase orders and put the data where it belongs.",
    does: [
      "Extracts fields from PDFs, scans and photos",
      "Checks documents for missing or expired details",
      "Feeds the data into your ERP, CRM or sheets",
      "A private assistant that answers from your own documents",
    ],
    replaces: "Manual typing, rekeying errors and searching shared drives.",
  },
  {
    title: "Content and marketing automation",
    short: "Posts, short videos, ad variations and landing pages, produced weekly and approved by you.",
    does: [
      "A content calendar drafted from your offers and seasons",
      "Short videos with voiceover in Arabic or English",
      "Ad copy variations to test on Meta and Google",
      "Nothing goes live until your team approves it",
    ],
    replaces: "Last-minute posting and paying for every small design job.",
  },
];

export const software = [
  {
    title: "Custom CRM and sales pipelines",
    short: "A CRM shaped around how your team sells, with every lead from every channel in one place.",
    does: [
      "Pipeline stages that match your real sales process",
      "WhatsApp, calls, email, portals and web forms flow in automatically",
      "Lead scoring, follow-up reminders and team targets",
      "Roles for owners, managers, sales staff and accounts",
    ],
    replaces: "Leads scattered across spreadsheets, phones and personal WhatsApp chats.",
  },
  {
    title: "Dashboards and reporting",
    short: "Live numbers for owners and managers on any screen, updated without anyone touching Excel.",
    does: [
      "Sales, bookings, collections and team performance in one view",
      "Data pulled automatically from the systems you already use",
      "Alerts when a number moves the wrong way",
      "A daily summary sent to your WhatsApp or inbox",
    ],
    replaces: "Monthly reports that are out of date by the time they arrive.",
  },
  {
    title: "Websites, web apps and customer portals",
    short: "Fast bilingual websites and portals where your customers book, pay and track everything themselves.",
    does: [
      "Arabic and English, with proper right-to-left layouts",
      "Booking, quotation, checkout and payment flows",
      "Customer, partner and staff portals with secure logins",
      "Fast on mobile and built to be found on Google",
    ],
    replaces: "An outdated site, a contact form nobody answers and status updates by phone.",
  },
  {
    title: "Backend systems and integrations",
    short: "The engine behind your apps: secure data, APIs and connections between every tool you use.",
    does: [
      "Connect your ERP, accounting, CRM, payment gateways and WhatsApp",
      "APIs for your mobile apps, partners and suppliers",
      "Secure databases with backups and a full audit trail",
      "Move off old systems without losing a single record",
    ],
    replaces: "Systems that don't talk to each other and data typed in twice.",
  },
  {
    title: "AI inside your existing software",
    short: "Add AI to the systems you already run, so your team gets answers instead of searching.",
    does: [
      "An assistant that answers from your own documents and data",
      "Automatic summaries of calls, chats, tickets and meetings",
      "Smart forms that fill themselves from a photo or PDF",
      "Forecasts and suggestions inside the screens your team uses",
    ],
    replaces: "Hours spent searching, summarising and copying between screens.",
  },
  {
    title: "Servers, hosting and support",
    short: "We deploy, monitor, back up and maintain everything we build, so it keeps running.",
    does: [
      "Cloud or UAE-hosted servers, sized for your traffic",
      "Round-the-clock monitoring with alerts to our team",
      "Daily backups, security updates and SSL handled for you",
      "Support agreements with agreed response times",
    ],
    replaces: "A freelancer who disappears after handover and a server nobody looks after.",
  },
];

export const steps = [
  {
    title: "Free audit and plan",
    time: "45 minutes",
    text: "We look at how enquiries, sales and admin flow through your business and your current systems, then list what to automate or build first.",
  },
  {
    title: "Paid pilot",
    time: "30 days",
    text: "We automate the task or ship the first module with the biggest payoff, used by your real team and customers, before you commit long term.",
  },
  {
    title: "Go live",
    time: "Within 14 days of sign-off",
    text: "Your agents, apps and workflows run on monitored servers. Your team gets training and a direct line to us.",
  },
  {
    title: "Improve every month",
    time: "Ongoing",
    text: "A monthly report shows volumes, hours saved and where the agent needed help. We fix those and add the next automation.",
  },
];

export const industries = [
  {
    id: "realestate",
    label: "Real estate",
    items: [
      "Reply to portal and WhatsApp leads within a minute, day or night",
      "Match buyers and tenants to listings and book viewings",
      "Send agents a lead summary before every viewing",
      "Chase documents and cheques for renewals automatically",
      "A CRM and dashboard for agents, listings and commissions",
    ],
  },
  {
    id: "clinics",
    label: "Clinics",
    items: [
      "Book, reschedule and confirm appointments over WhatsApp and phone",
      "Send reminders that cut no-shows",
      "Collect insurance details before the visit",
      "Answer FAQs on services, prices and directions",
      "A patient portal for bookings, reports and invoices",
    ],
  },
  {
    id: "travel",
    label: "Travel and tourism",
    items: [
      "Turn a chat into a priced quotation in minutes",
      "Send visa checklists and collect passport copies",
      "Confirm bookings and send itineraries automatically",
      "Follow up on quotes that went quiet",
      "A booking engine and partner portal for B2B agents",
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    items: [
      "Answer order and delivery questions without a support queue",
      "Recover abandoned carts on WhatsApp",
      "Write product descriptions in Arabic and English",
      "Handle returns and exchanges with clear rules",
      "Order, stock and sales dashboards across every channel",
    ],
  },
  {
    id: "trading",
    label: "Trading and logistics",
    items: [
      "Read purchase orders and invoices into your system",
      "Track shipments and update customers proactively",
      "Draft quotations from price lists and stock levels",
      "Flag overdue payments and send reminders",
      "Customer portals, ERP add-ons and live stock reports",
    ],
  },
];

export const principles = [
  {
    title: "A person approves what matters",
    text: "Anything that commits money, signs something or needs judgement goes to your team first. The agent hands over the moment a customer asks for a human.",
  },
  {
    title: "Your data is protected",
    text: "We work under a data processing agreement, follow the UAE Personal Data Protection Law and keep each client's data separate and encrypted.",
  },
  {
    title: "Arabic that sounds local",
    text: "Agents understand Gulf, Levantine and Egyptian Arabic, switch to English mid-conversation and keep your brand's tone.",
  },
  {
    title: "You are never locked in",
    text: "The code, workflows, prompts and data we build for you belong to you. We use more than one AI provider, so you always get the best model for the job.",
  },
];

export const packages = [
  {
    name: "Starter",
    for: "One channel, one job done well",
    items: ["One AI agent on WhatsApp or web chat", "Arabic and English", "Calendar or CRM connection", "Monthly performance report"],
  },
  {
    name: "Growth",
    for: "Most businesses start here",
    featured: true,
    items: [
      "Agents on WhatsApp, web and Instagram",
      "Two workflow automations",
      "CRM, calendar and accounting connections",
      "Monthly improvement session",
    ],
  },
  {
    name: "Scale",
    for: "Voice, documents and custom systems",
    items: ["Voice agents for inbound and outbound calls", "Document processing", "Custom integrations with your ERP", "Dedicated support line"],
  },
  {
    name: "Custom build",
    for: "Software made for your business",
    items: [
      "CRM, dashboard, portal or web app",
      "Website in Arabic and English",
      "Backend and integrations with your systems",
      "Hosting, monitoring and support",
    ],
  },
];

export const faqs = [
  {
    q: "Will customers know they are talking to AI?",
    a: "We recommend telling them, and most customers don't mind as long as they get a fast, correct answer. The agent always offers a person when the customer asks or when it isn't sure.",
  },
  {
    q: "What if the agent gets something wrong?",
    a: "Every conversation is logged. During the pilot your team reviews the sensitive steps before they happen, and we tune the agent weekly on anything it got wrong.",
  },
  {
    q: "Do we need to change our systems?",
    a: "Usually not. We connect to what you already use: WhatsApp Business, Google or Outlook calendars, common CRMs, accounting software and spreadsheets.",
  },
  {
    q: "How long until it's live?",
    a: "Most pilots go live within 14 days of sign-off. Bigger integrations with an ERP or custom system take longer, and we'll tell you how long at the audit.",
  },
  {
    q: "How is pricing worked out?",
    a: "A one-time setup fee plus a monthly plan that covers hosting, monitoring and improvements. You get a fixed quote after the free audit, before you commit to anything.",
  },
  {
    q: "Where is our data stored?",
    a: "On monitored servers with encryption and per-client separation. If your sector needs data kept in the UAE, we design for that from day one.",
  },
  {
    q: "Can you build a custom CRM, dashboard or app for us?",
    a: "Yes. We build CRMs, dashboards, customer portals, websites and web apps around how your business actually works, and connect them to your AI agents and existing systems. You see working screens every week, not just at the end.",
  },
  {
    q: "Can you work with our existing website or software?",
    a: "Usually, yes. We can improve or extend what you have, connect it to new tools, or move you to something better without losing your data. We'll recommend the cheapest route that works at the audit.",
  },
  {
    q: "Who hosts and maintains what you build?",
    a: "We can. We deploy on monitored servers, handle backups, security updates and fixes, and keep improving it under a monthly plan. If you prefer your own servers or IT team, we hand over everything with documentation.",
  },
];

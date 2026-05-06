"use client";

import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    label: "UI Components",
    color: "bg-violet-500",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
    bgLight: "bg-violet-50",
    items: [
      { title: "Typography", desc: "Headings, body, captions, labels", href: "/design/typo", icon: "T" },
      { title: "Button", desc: "Primary, secondary, ghost, icon variants", href: "/design/button", icon: "B" },
      { title: "Text Input", desc: "Input, textarea, search field", href: "/design/text-input", icon: "⌨" },
      { title: "Radio Button", desc: "Single select, grouped options", href: "/design/radio", icon: "◉" },
      { title: "Toggle Button Group", desc: "Multi-select, segmented control", href: "/design/toggle-group", icon: "⊞" },
      { title: "Sheet", desc: "Bottom / side slide-in panel", href: "/design/sheet", icon: "▤" },
      { title: "Dialog", desc: "Modal dialogs and confirmations", href: "/design/dialog", icon: "⬜" },
      { title: "Response Drawer", desc: "Contextual action drawer", href: "/design/drawer", icon: "↑" },
      { title: "Form Field / Wrapper", desc: "Label, hint, error states", href: "/design/field", icon: "⊟" },
      { title: "Header", desc: "Top navigation bar variants", href: "/design/header", icon: "▬" },
      { title: "Footer", desc: "Site footer layout", href: "/design/footer", icon: "▬" },
    ],
  },
  {
    label: "Functional Components",
    color: "bg-sky-500",
    textColor: "text-sky-600",
    borderColor: "border-sky-200",
    bgLight: "bg-sky-50",
    items: [
      { title: "Date Input", desc: "Date picker with calendar overlay", href: "/design/date-input", icon: "📅" },
      { title: "Phone Number Input", desc: "Country code + number field", href: "/design/phone-input", icon: "📞" },
      { title: "Overlay Country Selection", desc: "Searchable country picker", href: "/design/country-select", icon: "🌐" },
      { title: "Location Picker", desc: "Map-based location selector", href: "/design/location-picker", icon: "📍" },
      { title: "Phone OTP", desc: "SMS one-time password flow", href: "/design/phone-otp", icon: "🔢" },
      { title: "Email OTP", desc: "Email one-time password flow", href: "/design/email-otp", icon: "✉" },
    ],
  },
  {
    label: "Journey",
    color: "bg-rose-500",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
    bgLight: "bg-rose-50",
    items: [
      { title: "Login", desc: "Two-step email / phone sign in", href: "/design-system/login", icon: "🔑" },
      { title: "Register", desc: "New user sign-up flow", href: "/snippets/register", icon: "📝" },
      { title: "Post", desc: "Create a new listing", href: "/snippets/post", icon: "➕" },
      { title: "Listing", desc: "Browse / search results page", href: "/snippets/listing", icon: "📋" },
      { title: "Details", desc: "Single listing detail view", href: "/snippets/details", icon: "🔍" },
      { title: "Private Profile", desc: "My profile & settings", href: "/snippets/private-profile", icon: "👤" },
      { title: "Public Profile", desc: "Other user's profile page", href: "/snippets/public-profile", icon: "👥" },
      { title: "Adv Management", desc: "Manage your advertisements", href: "/snippets/adv-management", icon: "📊" },
      { title: "Chat", desc: "Messaging thread UI", href: "/snippets/chat", icon: "💬" },
      { title: "Donation", desc: "Donation flow and confirmation", href: "/snippets/donation", icon: "💝" },
    ],
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function ComponentCard({
  title,
  desc,
  href,
  icon,
  textColor,
  borderColor,
  bgLight,
}: {
  title: string;
  desc: string;
  href: string;
  icon: string;
  textColor: string;
  borderColor: string;
  bgLight: string;
}) {
  return (
    <Link
      href={href}
      className={`
        group flex items-start gap-3 rounded-xl border ${borderColor}
        bg-white hover:${bgLight} px-4 py-3
        shadow-sm hover:shadow-md
        transition-all duration-150 active:scale-[0.98]
      `}
    >
      <span
        className={`
          flex-none w-9 h-9 rounded-lg ${bgLight} ${textColor}
          flex items-center justify-center text-base font-bold
          group-hover:scale-110 transition-transform duration-150
        `}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold text-slate-800 group-hover:${textColor} transition-colors`}>
          {title}
        </p>
        <p className="text-xs text-slate-500 truncate">{desc}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`ml-auto flex-none size-4 text-slate-300 group-hover:${textColor} group-hover:translate-x-0.5 transition-all duration-150`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const total = sections.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-slate-900 px-4 py-10">
        <div className="container mx-auto max-w-screen-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              v1.0
            </span>
            <span className="text-xs text-slate-500">{total} components</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            Lokalads Design System
          </h1>
          <p className="text-slate-400 text-sm max-w-lg">
            All UI components, functional components, and user journeys in one place.
            Click any card to preview the component.
          </p>

          {/* Stats row */}
          <div className="flex gap-4 mt-6">
            {sections.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${s.color}`} />
                <span className="text-xs text-slate-400">
                  {s.items.length} {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-10">
        {sections.map((section) => (
          <section key={section.label}>

            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full ${section.color}`} />
              <h2 className="text-base font-bold text-slate-700 tracking-tight">
                {section.label}
              </h2>
              <span className="text-xs text-slate-400 bg-slate-200 rounded-full px-2 py-0.5">
                {section.items.length}
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {section.items.map((item) => (
                <ComponentCard
                  key={item.title}
                  {...item}
                  textColor={section.textColor}
                  borderColor={section.borderColor}
                  bgLight={section.bgLight}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 mt-4 py-6 text-center">
        <p className="text-xs text-slate-400">
          Lokalads Design System · Internal use only
        </p>
      </div>
    </main>
  );
}
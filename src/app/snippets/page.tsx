import Link from "next/link";

const snippets = [
  { name: "Button Variants", slug: "button-variants", icon: "⬡", desc: "Explore button styles and interaction states" },
  { name: "Chat", slug: "chat", icon: "◈", desc: "Messaging UI components and layouts" },
  { name: "Delete Account", slug: "delete-account", icon: "⊗", desc: "Destructive action flows and confirmations" },
  { name: "Icons", slug: "icons", icon: "◉", desc: "Icon library and usage patterns" },
  { name: "Landing Category", slug: "landing-category", icon: "▦", desc: "Category grids for landing pages" },
  { name: "Login", slug: "login", icon: "◎", desc: "Authentication and login form variants" },
  { name: "Phone Number Input", slug: "phone-number-input", icon: "⊕", desc: "International phone input with country codes" },
  { name: "Private Profile", slug: "private-profile", icon: "◫", desc: "Private user profile views" },
  { name: "Public Profile", slug: "public-profile", icon: "◩", desc: "Public-facing user profile pages" },
  { name: "Responsive Dialog", slug: "responsive-dialog", icon: "▣", desc: "Modal and dialog components across breakpoints" },
  { name: "Rich Text Editor", slug: "rich-text-editor", icon: "▤", desc: "WYSIWYG editor components" },
  { name: "Security", slug: "security", icon: "⬡", desc: "Security settings and 2FA flows" },
  { name: "Switch Country", slug: "switch-country", icon: "◍", desc: "Country/region switcher components" },
  { name: "Timeline", slug: "timeline", icon: "▷", desc: "Chronological event and activity feeds" },
  { name: "Toggle Group", slug: "toggle-group", icon: "▪", desc: "Toggle button groups and tab variants" },
  { name: "Typography", slug: "typography", icon: "∂", desc: "Type scale, headings, and text styles" },
];

export default function SnippetsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-mono">
      {/* Header */}
      <div className="border-b border-slate-800 px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">la-nextjs / src / app / snippets</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Snippets Index
          </h1>
        </div>
        <span className="text-xs text-slate-500 bg-slate-900 border border-slate-700 px-3 py-1 rounded">
          {snippets.length} components
        </span>
      </div>

      {/* Grid */}
      <div className="px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {snippets.map((snippet) => (
          <Link
            key={snippet.slug}
            href={`/snippets/${snippet.slug}`}
            className="group relative block border border-slate-800 rounded-lg p-5 bg-slate-900 hover:bg-slate-800 hover:border-slate-600 transition-all duration-150"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-lg text-slate-400 group-hover:text-white transition-colors">
                {snippet.icon}
              </span>
              <svg
                className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-colors mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-200 group-hover:text-white mb-1 transition-colors">
              {snippet.name}
            </p>
            <p className="text-xs text-slate-500 group-hover:text-slate-400 leading-relaxed transition-colors">
              {snippet.desc}
            </p>
            <div className="mt-3 text-[10px] text-slate-700 group-hover:text-slate-500 transition-colors">
              /snippets/{snippet.slug}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-slate-800 text-xs text-slate-600">
        Ready in 14.3s · localhost:3000/snippets
      </div>
    </main>
  );
}
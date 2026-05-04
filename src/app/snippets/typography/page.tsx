import Link from "next/link";

const typeScale = [
  {
    token: "Display",
    sample: "The quick brown fox",
    className: "text-6xl font-black leading-none font-display",
    size: "60px",
    weight: "900 · Black",
    family: "Inter Display",
    use: "Hero headings, landing pages",
  },
  {
    token: "H1",
    sample: "The quick brown fox jumps",
    className: "text-5xl font-extrabold leading-tight font-display",
    size: "48px",
    weight: "800 · ExtraBold",
    family: "Inter Display",
    use: "Page titles",
  },
  {
    token: "H2",
    sample: "The quick brown fox jumps over the lazy",
    className: "text-4xl font-bold leading-tight font-display",
    size: "36px",
    weight: "700 · Bold",
    family: "Inter Display",
    use: "Section headings",
  },
  {
    token: "H3",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "text-3xl font-semibold leading-snug font-display",
    size: "30px",
    weight: "600 · SemiBold",
    family: "Inter Display",
    use: "Card headers, modal titles",
  },
  {
    token: "H4",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "text-2xl font-semibold leading-snug",
    size: "24px",
    weight: "600 · SemiBold",
    family: "Inter",
    use: "Subsection headers",
  },
  {
    token: "H5",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "text-xl font-medium leading-snug",
    size: "20px",
    weight: "500 · Medium",
    family: "Inter",
    use: "Group labels, small titles",
  },
  {
    token: "H6",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "text-lg font-medium leading-normal",
    size: "18px",
    weight: "500 · Medium",
    family: "Inter",
    use: "UI section labels",
  },
  {
    token: "Body LG",
    sample:
      "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow.",
    className: "text-lg font-normal leading-relaxed",
    size: "18px",
    weight: "400 · Regular",
    family: "Inter",
    use: "Intro paragraphs, featured body text",
  },
  {
    token: "Body MD",
    sample:
      "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs.",
    className: "text-base font-normal leading-relaxed",
    size: "16px",
    weight: "400 · Regular",
    family: "Inter",
    use: "Default body text, articles, descriptions",
  },
  {
    token: "Body SM",
    sample:
      "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow.",
    className: "text-sm font-normal leading-normal",
    size: "14px",
    weight: "400 · Regular",
    family: "Inter",
    use: "Secondary text, form help text",
  },
  {
    token: "Caption",
    sample:
      "The quick brown fox jumps over the lazy dog. For metadata, timestamps, hints.",
    className: "text-xs font-medium leading-normal",
    size: "12px",
    weight: "500 · Medium",
    family: "Inter",
    use: "Captions, timestamps, badges, hints",
  },
] as const;

const weightScale = [
  { label: "Thin", cls: "font-thin", value: "100" },
  { label: "ExtraLight", cls: "font-extralight", value: "200" },
  { label: "Light", cls: "font-light", value: "300" },
  { label: "Regular", cls: "font-normal", value: "400" },
  { label: "Medium", cls: "font-medium", value: "500" },
  { label: "SemiBold", cls: "font-semibold", value: "600" },
  { label: "Bold", cls: "font-bold", value: "700" },
  { label: "ExtraBold", cls: "font-extrabold", value: "800" },
  { label: "Black", cls: "font-black", value: "900" },
] as const;

const italicSamples = [
  { label: "Light 300", cls: "text-2xl font-light italic" },
  { label: "Regular 400", cls: "text-2xl font-normal italic" },
  { label: "Medium 500", cls: "text-2xl font-medium italic" },
  { label: "SemiBold 600", cls: "text-2xl font-semibold italic" },
  { label: "Bold 700", cls: "text-2xl font-bold italic" },
  { label: "Black 900", cls: "text-2xl font-black italic" },
] as const;

const guidelines = [
  "Use Inter Display for anything H1–H3 (30px+). It's optically superior at large sizes.",
  "Use Inter for everything else — H4, body, labels, UI copy.",
  "12px is the floor. Never go below Caption size for any functional text.",
  "Body text: Regular weight, relaxed line-height (1.625). Never tight line-height on body.",
  "Don't bold body copy. Use Medium (500) for emphasis within body text, Bold only for headings.",
  "Muted foreground for supporting text, full foreground for primary content. No custom colors.",
];

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </p>
      <p className="text-sm text-muted-foreground/60 mt-1">{desc}</p>
      <div className="mt-5 h-px bg-border" />
    </div>
  );
}

function Dot() {
  return <span className="text-muted-foreground/30 text-xs">·</span>;
}

export default function TypographyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          ← Home
        </Link>

        {/* Page Header */}
        <div className="mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Snippets · Typography
          </p>
          <h1 className="text-5xl font-extrabold font-display text-foreground leading-tight tracking-tight">
            Typography
          </h1>
          <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
            Inter + Inter Display — self-hosted, variable font (100–900). A living reference for
            scale, weight, and hierarchy decisions across all layouts.
          </p>
        </div>

        {/* ── Type Scale ── */}
        <section className="mb-20">
          <SectionHeader
            title="Type Scale"
            desc="Recommended scale from Display down to Caption. Use Inter Display for H1–H3 and above."
          />
          <div className="divide-y divide-border">
            {typeScale.map((row) => (
              <div key={row.token} className="py-7">
                <p className={`${row.className} text-foreground wrap-break-word`}>{row.sample}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                  <span className="text-xs font-bold font-mono uppercase tracking-widest text-muted-foreground">
                    {row.token}
                  </span>
                  <Dot />
                  <span className="text-xs font-mono text-muted-foreground">{row.size}</span>
                  <Dot />
                  <span className="text-xs text-muted-foreground">{row.weight}</span>
                  <Dot />
                  <span className="text-xs text-muted-foreground">{row.family}</span>
                  <Dot />
                  <span className="text-xs text-muted-foreground/50 italic">{row.use}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Weight Scale ── */}
        <section className="mb-20">
          <SectionHeader
            title="Weight Scale — Inter Variable"
            desc="All 9 weights from a single variable font file (InterVariable.woff2). No separate file needed per weight."
          />
          <div className="divide-y divide-border">
            {weightScale.map((w) => (
              <div key={w.value} className="py-5 flex items-baseline gap-6">
                <div className="w-32 shrink-0 flex items-baseline gap-1.5">
                  <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
                    {w.label}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/30">{w.value}</span>
                </div>
                <p className={`text-xl ${w.cls} text-foreground`}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Inter vs Inter Display ── */}
        <section className="mb-20">
          <SectionHeader
            title="Inter vs Inter Display"
            desc="Inter Display is optically tuned for larger sizes — tighter spacing, refined curves. Best at 28px and above."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-5">
                Inter
              </p>
              <p className="text-5xl font-bold text-foreground leading-none">Handgloves</p>
              <p className="text-3xl font-normal text-muted-foreground mt-2">0123456789</p>
              <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
                Optimized for small–medium sizes. Slightly wider spacing aids legibility at 12–24px.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-5">
                Inter Display
              </p>
              <p className="font-display text-5xl font-bold text-foreground leading-none">
                Handgloves
              </p>
              <p className="font-display text-3xl font-normal text-muted-foreground mt-2">
                0123456789
              </p>
              <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
                Refined for display sizes. Tighter metrics, more precise curves. Best at 28px and above.
              </p>
            </div>
          </div>
        </section>

        {/* ── Italic Variants ── */}
        <section className="mb-20">
          <SectionHeader
            title="Italic Variants"
            desc="Inter Variable includes a full italic axis. Key weights shown below."
          />
          <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
            {italicSamples.map((row) => (
              <div key={row.label} className="px-6 py-4 flex items-baseline gap-6">
                <span className="w-28 shrink-0 text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
                  {row.label}
                </span>
                <p className={`${row.cls} text-foreground`}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Usage Guidelines ── */}
        <section>
          <SectionHeader
            title="Usage Guidelines"
            desc="Quick rules to keep typography consistent across all layouts."
          />
          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            {guidelines.map((rule, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-primary mt-0.5 shrink-0 text-sm font-bold leading-none">—</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

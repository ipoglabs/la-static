import Link from "next/link";

export default function ButtonVariantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          ← Home
        </Link>

        <div className="mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Snippets · Button Variants
          </p>
          <h1 className="text-5xl font-extrabold font-display text-foreground leading-tight tracking-tight">
            Button Variants
          </h1>
          <p className="text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">
            All button variants, sizes, states, and icon patterns — reference for consistent button
            usage across layouts.
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-border p-20 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Work in progress — coming soon.</p>
        </div>

      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "danger";

function Button({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  const base = "px-4 py-2 rounded-lg font-medium";

  const styles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-gray-400",
    danger: "bg-red-600 text-white",
  };

  return (
    <button className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}

export default function Page() {
  return (
    <main className="p-6 space-y-6">
      {/* Typography */}
      <div>
        <h1 className="text-3xl font-bold">Demo UI</h1>
     </div>

      {/* Link Buttons */}
      <div className="flex gap-4">
        <Link href="/design/login">
          <Button variant="primary">Login</Button>
        </Link>

        <Link href="/timeline">
          <Button variant="primary">Timeline</Button>
        </Link>

         <Link href="/timeline">
          <Button variant="primary">Buttons</Button>
        </Link>

         <Link href="/timeline">
          <Button variant="primary">Typography</Button>
        </Link>

         <Link href="/timeline">
          <Button variant="primary">Phonenumber input</Button>
        </Link>
      </div>

    </main>
  );
}
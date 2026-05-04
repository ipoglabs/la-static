"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, Trash2, Loader2 } from "lucide-react";
import { useDeleteAccountStore } from "@/lib/stores/deleteAccountStore";
import type { ReactNode } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5 shrink-0 text-slate-300">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
// Floating label sits above card — iOS-settings style hierarchy

function Section({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-sm font-bold text-slate-700">
          {label}
        </span>
        {onEdit && (
          <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            Edit
          </button>
        )}
      </div>
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        {children}
      </div>
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
// Label left (muted) · value right (bold) — no colon, clean side-by-side

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3.5 border-b border-slate-100 last:border-0">
      <div className="text-xs font-semibold text-slate-500 mb-1">{label}</div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

// ─── Contact Row ─────────────────────────────────────────────────────────────
// Stacked label + value, with Edit button on right edge

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 last:border-0 gap-4 min-h-15">
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-slate-500">{label}</div>
        <div className="text-sm font-semibold text-slate-900 mt-0.5 truncate">{value}</div>
      </div>
      <button className="shrink-0 text-xs font-semibold text-slate-500 border border-slate-200 px-3.5 py-1.5 rounded-lg hover:border-slate-400 hover:text-slate-800 transition-colors">
        Edit
      </button>
    </div>
  );
}

// ─── Settings Row ─────────────────────────────────────────────────────────────

function SettingsRow({ label }: { label: string }) {
  return (
    <button className="w-full flex items-center justify-between px-4 py-3.5 border-b border-slate-100 last:border-0 text-left min-h-13 group">
      <span className="text-sm font-medium text-slate-800 transition-colors group-hover:text-slate-900">
        {label}
      </span>
      <ChevronRight />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivateProfilePage() {
  const router = useRouter();
  const { checkEligibility, isLoading, error, reset } = useDeleteAccountStore();

  const handleDeleteClick = async () => {
    reset();
    const eligible = await checkEligibility();
    if (eligible) router.push("/snippets/delete-account/confirm");
  };

  return (
    <>
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          <button aria-label="Go back" className="text-slate-500 hover:text-slate-800 transition-colors -ml-1">
            <ChevronLeft />
          </button>
          <h1 className="text-base font-bold text-slate-900">My Profile</h1>
          <div className="size-5" />
        </div>
      </header>

      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-xl mx-auto px-4 pb-10 flex flex-col gap-6">

          {/* ── Avatar Hero ── */}
          <div className="flex items-center gap-3.5 pt-5 pb-1">
            <div className="relative shrink-0">
              <div className="size-14 rounded-full bg-slate-900 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                A
              </div>
              <button aria-label="Change photo" className="absolute -bottom-0.5 -right-0.5 size-5 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Z" />
                </svg>
              </button>
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 leading-tight">Anto nee</h2>
              <p className="text-xs text-slate-400 mt-0.5">@anto27 · Individual</p>
            </div>
          </div>

          {/* ── Public Profile ── */}
          <Section label="Public Profile" onEdit>
            <InfoRow label="Profile ID" value="anto27" />
          </Section>

          {/* ── Basic Info ── */}
          <Section label="Basic Info" onEdit>
            <InfoRow label="First Name" value="Anto" />
            <InfoRow label="Last Name" value="nee" />
            <InfoRow label="Role" value="Individual" />
            <InfoRow label="Date of Birth" value="Feb 2, 2000" />
          </Section>

          {/* ── Contact ── */}
          <Section label="Contact Information">
            <ContactRow label="Email Address" value="antodeveloper27@gmail.com" />
            <ContactRow label="Phone Number" value="mock 1234567899" />
          </Section>

          {/* ── Location ── */}
          <Section label="Location" onEdit>
            <InfoRow label="Country" value="India" />
            <InfoRow label="State" value="Tamil Nadu" />
            <InfoRow label="City" value="Tiruchirappalli" />
            <InfoRow label="Postal Code" value="620 001" />
          </Section>

          {/* ── Account Settings ── */}
          <Section label="Account Settings">
            <SettingsRow label="Reset Password" />
            <SettingsRow label="Two-Factor Authentication" />
            <SettingsRow label="Notifications" />
          </Section>

          {/* ── Danger Zone ── */}
          <div>
            <div className="px-1 mb-2">
              <span className="text-sm font-bold text-slate-700">Danger Zone</span>
            </div>
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 overflow-hidden">
              <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                <ShieldAlert className="size-5 text-yellow-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-yellow-900">Permanent action</p>
                  {error ? (
                    <p className="text-sm text-rose-600 mt-0.5">{error}</p>
                  ) : (
                    <p className="text-sm text-yellow-800 mt-0.5 font-normal">Deleting your account is irreversible. All your data will be permanently removed.</p>
                  )}
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleDeleteClick}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-white px-4 py-1.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white hover:border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                  Delete Account
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}


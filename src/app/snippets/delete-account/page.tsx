"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, Trash2, Loader2 } from "lucide-react";
import { useDeleteAccountStore } from "@/lib/stores/deleteAccountStore";

/**
 * DeleteAccountPage
 *
 * The Danger Zone section — lives at the bottom of a user profile page.
 * This is the only entry point into the delete account journey.
 *
 * On click:
 *   1. Calls checkEligibility() → [API] GET /account/delete-eligibility
 *   2. If eligible  → resets journey state + navigates to /confirm
 *   3. If ineligible → shows inline error on the banner (no navigation)
 */
export default function DeleteAccountPage() {
  const router = useRouter();
  const { checkEligibility, isLoading, error, reset } = useDeleteAccountStore();

  const handleDeleteClick = async () => {
    reset();               // clears all state including any previous error
    const eligible = await checkEligibility();
    if (eligible) {
      router.push("/snippets/delete-account/confirm");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(248,250,252,1),rgba(241,245,249,1)_45%,rgba(226,232,240,1)_100%)] px-6 py-14">
      <div className="mx-auto w-full max-w-lg">
        {/* Page context header — would not exist in a real profile page */}
        <header className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400">Snippet</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Delete Account Journey</h1>
          <p className="mt-1 text-sm text-slate-500">
            The Danger Zone section lives at the bottom of a user profile page.
            Tapping the CTA opens a dedicated confirmation flow.
          </p>
        </header>

        {/* Inline warning banner at the bottom */}
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6 pointer-events-none">
          <div className="pointer-events-auto flex w-full max-w-xl flex-col md:flex-row md:items-center rounded-lg border border-yellow-300 bg-linear-to-r from-yellow-50 via-yellow-100 to-yellow-50 px-4 py-3">
            {/* Icon + title/description */}
            <div className="flex flex-row items-center w-full md:w-auto flex-1">
              <div className="flex items-center justify-center h-10 w-10 mr-2 ml-0">
                <ShieldAlert className="h-8 w-8 text-yellow-600 stroke-1" />
              </div>
              <div className="flex flex-col flex-1 min-w-0 text-left">
                <span className="text-base font-semibold text-yellow-800">Danger zone</span>
                {error ? (
                  <span className="text-sm font-light text-rose-600 mt-0.5">{error}</span>
                ) : (
                  <span className="text-sm font-light text-yellow-900 mt-0.5">
                    Need to delete your account? This action is permanent and cannot be undone.
                  </span>
                )}
              </div>
            </div>
            {/* Button — below and left on mobile, right on md+ */}
            <div className="flex items-center w-full justify-start mt-3 md:mt-0 md:w-auto md:ml-4 md:justify-end md:self-center">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleDeleteClick}
                className="inline-flex items-center gap-2 rounded-full border border-rose-400 bg-rose-100 px-5 py-2 text-sm font-normal text-rose-700 transition hover:bg-rose-500 hover:text-white hover:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

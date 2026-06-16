import { prisma } from '@/lib/prisma'
import DonationsTable from '@/components/DonationsTable'

// Always hit the database fresh — this page shows live data, never a cached snapshot.
export const dynamic = 'force-dynamic'

function formatCurrency(minorUnits: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(minorUnits / 100)
  } catch {
    return `${(minorUnits / 100).toFixed(2)} ${currency.toUpperCase()}`
  }
}

export default async function DonationsAdminPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const totalCount = donations.length
  const successCount = donations.filter((d) => d.status === 'success').length
  const pendingCount = donations.filter((d) => d.status === 'pending').length
  const failedCount = donations.filter((d) => d.status === 'failed').length

  // Sum raised per currency, successful donations only.
  const totalsByCurrency: Record<string, number> = {}
  for (const d of donations) {
    if (d.status !== 'success') continue
    totalsByCurrency[d.currency] = (totalsByCurrency[d.currency] ?? 0) + d.amount
  }

  // Dates need to be plain strings to safely cross the server → client boundary.
  const serialized = donations.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
  }))

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-800 px-6 py-5">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl font-bold text-white">Donations</h1>
          <p className="text-sm text-slate-300 mt-0.5">
            {totalCount} record{totalCount === 1 ? '' : 's'} · {successCount} completed · {pendingCount} pending · {failedCount} failed
          </p>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {/* Totals raised, by currency */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.keys(totalsByCurrency).length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
              <p className="text-sm text-slate-500">No completed donations yet</p>
            </div>
          ) : (
            Object.entries(totalsByCurrency).map(([currency, amount]) => (
              <div key={currency} className="rounded-xl border border-slate-200 bg-white px-5 py-4 min-w-[160px]">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {currency.toUpperCase()} raised
                </p>
                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {formatCurrency(amount, currency)}
                </p>
              </div>
            ))
          )}
        </div>

        <DonationsTable donations={serialized} />
      </main>
    </div>
  )
}

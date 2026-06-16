'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type Donation = {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  currency: string
  method: string
  status: string
  transactionId: string | null
  createdAt: string
}

const METHOD_LABELS: Record<string, string> = {
  cc: 'Card',
  wp: 'Wallet',
  sp: 'Scan / QR',
}

const STATUS_STYLES: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  failed: 'bg-rose-50 text-rose-700 border-rose-200',
}

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DonationsTable({ donations }: { donations: Donation[] }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all')

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return (
        d.donorName.toLowerCase().includes(q) ||
        d.donorEmail.toLowerCase().includes(q) ||
        (d.transactionId ?? '').toLowerCase().includes(q)
      )
    })
  }, [donations, query, statusFilter])

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-200">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or transaction ID"
          className="flex-1 min-w-[220px] rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
        <div className="flex gap-1.5">
          {(['all', 'success', 'pending', 'failed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors capitalize',
                statusFilter === s
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Donor</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Method</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Transaction ID</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                  No donations match your search.
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-800">{d.donorName}</p>
                    <p className="text-xs text-slate-500">{d.donorEmail}</p>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">
                    {formatCurrency(d.amount, d.currency)}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">
                    {METHOD_LABELS[d.method] ?? d.method}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize',
                        STATUS_STYLES[d.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'
                      )}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                    {d.transactionId ?? '—'}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                    {formatDate(d.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

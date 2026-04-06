import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LokalAds',
  description: 'Find anything with LokalAds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-w-[375px]">{children}</body>
    </html>
  )
}

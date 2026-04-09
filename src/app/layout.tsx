import type { Metadata, Viewport } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'LokalAds',
  description: 'Find anything with LokalAds',
}

// ✅ MOVE viewport here (separate export)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-w-[375px]">
        
        <Header />

        {children}

        <Footer />

      </body>
    </html>
  )
}
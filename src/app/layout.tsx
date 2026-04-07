import type { Metadata } from 'next'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
      <body className="min-w-[375px]">
        
        <Header />

        {children}

        <Footer />

      </body>
    </html>
  )
}
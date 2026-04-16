import type { Metadata, Viewport } from "next"
import "./globals.css"

import Header from "@/components/Header"
import Footer from "@/components/Footer"

import { cookies } from "next/headers"
import {
  COUNTRY_COOKIE,
  isSupportedCountry,
} from "@/lib/country-context"
import { CountryProvider } from "@/components/country/CountryProvider"

import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"

// ✅ Use Inter instead of Geist
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "LokalAds",
  description: "Find anything with LokalAds",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jar = cookies()
  const raw = jar.get(COUNTRY_COOKIE)?.value ?? ""
  const initialCountry = isSupportedCountry(raw) ? raw : null

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="bg-slate-950/10 min-w-[375px]">
        <CountryProvider initialCountry={initialCountry}>
          <Header />
          <main>{children}</main>
          <Footer />
        </CountryProvider>
      </body>
    </html>
  )
}
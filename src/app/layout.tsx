import { cookies } from "next/headers"
import { COUNTRY_COOKIE, isSupportedCountry } from "@/lib/country-context"
import { CountryProvider } from "@/components/country/CountryProvider"
import { ToastProvider } from "@/components/ui/toast"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jar = cookies()
  const raw = jar.get(COUNTRY_COOKIE)?.value ?? ""
  const initialCountry = isSupportedCountry(raw) ? raw : null

  return (
    <html lang="en" className={cn("font-sans w-full", "font-sans", GeistSans.className, inter.variable)}>
      <body className="bg-slate-950/10 min-w-[375px] w-full min-h-screen overflow-x-hidden">
        <ToastProvider>
          <CountryProvider initialCountry={initialCountry}>
            {children}
          </CountryProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
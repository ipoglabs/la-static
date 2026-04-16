"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

// ─── Responsive check (NO external hook) ───────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return isDesktop
}

// ─── Reusable Sheet ────────────────────────────────────────
function ResponsiveSheet({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  children: React.ReactNode
}) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto text-sm text-slate-600 space-y-4">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto text-sm text-slate-600 space-y-4">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// ─── Content ───────────────────────────────────────────────
function PrivacyPolicyContent() {
  return (
    <>
      <p>At Lokalads, your privacy is important to us.</p>
      <h3 className="font-semibold text-slate-800">Information We Collect</h3>
      <p>We collect personal info and usage data.</p>
    </>
  )
}

function ConditionsContent() {
  return (
    <>
      <p>By using Lokalads, you agree to these terms.</p>
      <h3 className="font-semibold text-slate-800">Use</h3>
      <p>No fraudulent listings allowed.</p>
    </>
  )
}

function CookiePolicyContent() {
  return (
    <>
      <p>We use cookies to enhance experience.</p>
      <h3 className="font-semibold text-slate-800">Types</h3>
      <p>Essential, analytics, and preference cookies.</p>
    </>
  )
}

// ─── Footer ────────────────────────────────────────────────
export default function Footer() {
  const [active, setActive] = React.useState<
    null | "privacy" | "terms" | "cookies"
  >(null)

  return (
    <footer className="bg-slate-800 text-white p-6 text-center space-y-4">

      {/* Logo */}
      <div className="flex justify-center items-center gap-2">
        <Image src="/assets/la-logo-symbol-black.svg" alt="logo" width={40} height={40} />
        <span className="font-semibold">Lokalads</span>
      </div>

      {/* Links */}
      <div className="flex justify-center gap-4 flex-wrap text-sm">
        <button onClick={() => setActive("privacy")} className="underline hover:text-gray-300">
          Privacy Policy
        </button>
        <button onClick={() => setActive("terms")} className="underline hover:text-gray-300">
          Conditions
        </button>
        <button onClick={() => setActive("cookies")} className="underline hover:text-gray-300">
          Cookies
        </button>
      </div>

      {/* Drawer / Dialog */}
      <ResponsiveSheet
        open={active === "privacy"}
        onOpenChange={() => setActive(null)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </ResponsiveSheet>

      <ResponsiveSheet
        open={active === "terms"}
        onOpenChange={() => setActive(null)}
        title="Terms & Conditions"
      >
        <ConditionsContent />
      </ResponsiveSheet>

      <ResponsiveSheet
        open={active === "cookies"}
        onOpenChange={() => setActive(null)}
        title="Cookie Policy"
      >
        <CookiePolicyContent />
      </ResponsiveSheet>

    </footer>
  )
}
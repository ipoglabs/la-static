"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

function Sheet(props: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const { open, onClose, title, children } = props;

  const y = useMotionValue(0);

  const FULL = 0;
  const HALF = 350;
  const CLOSE = 800;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            style={{ y }}
            className="
              fixed bottom-0 left-0 right-0
              md:left-1/2 md:-translate-x-1/2
              z-50 w-full md:max-w-lg
              bg-white
              rounded-t-3xl md:rounded-3xl
              shadow-2xl flex flex-col
              h-[90vh] md:h-[80vh]
              md:bottom-10
            "
            initial={{ y: CLOSE }}
            animate={{ y: HALF }}
            exit={{ y: CLOSE }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            drag="y"
            dragConstraints={{ top: FULL, bottom: CLOSE }}
            dragElastic={0.15}
            onDragEnd={() => {
              const currentY = y.get();

              if (currentY < 150) {
                y.set(FULL); // expand full
              } else if (currentY < 550) {
                y.set(HALF); // stay half
              } else {
                onClose(); // close
              }
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-5 py-4 text-sm text-slate-600 leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
// ─── Sheet Content ────────────────────────────────────────────────────────────
function PrivacyPolicyContent() {
  return (
    <>
      <p>At Lokalads, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.</p>
      <h3 className="font-semibold text-slate-800">Information We Collect</h3>
      <p>We collect information you provide directly, such as your name, email address, and any listings you post. We also collect usage data automatically, including IP address, browser type, and pages visited.</p>
      <h3 className="font-semibold text-slate-800">How We Use Your Information</h3>
      <p>We use your information to provide and improve our services, communicate with you about your account, and ensure the safety and security of our platform.</p>
      <h3 className="font-semibold text-slate-800">Data Sharing</h3>
      <p>We do not sell your personal data to third parties. We may share information with trusted service providers who assist us in operating our platform, subject to strict confidentiality agreements.</p>
      <h3 className="font-semibold text-slate-800">Your Rights</h3>
      <p>You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@lokalads.com for any requests.</p>
      <h3 className="font-semibold text-slate-800">Contact</h3>
      <p>For privacy-related inquiries, please contact us at privacy@lokalads.com or write to our registered address.</p>
    </>
  );
}

function ConditionsContent() {
  return (
    <>
      <p>By using Lokalads, you agree to these Terms and Conditions. Please read them carefully before using our platform.</p>
      <h3 className="font-semibold text-slate-800">Use of the Platform</h3>
      <p>You must be at least 18 years old to use Lokalads. You agree not to post false, misleading, or fraudulent listings and to comply with all applicable laws.</p>
      <h3 className="font-semibold text-slate-800">Listings & Content</h3>
      <p>You are solely responsible for the content of your listings. Lokalads reserves the right to remove any listing that violates our policies without prior notice.</p>
      <h3 className="font-semibold text-slate-800">Liability</h3>
      <p>Lokalads acts as a platform connecting buyers and sellers and is not a party to any transaction. We are not liable for any loss or damage arising from transactions made through the platform.</p>
      <h3 className="font-semibold text-slate-800">Account Termination</h3>
      <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or harm other users.</p>
      <h3 className="font-semibold text-slate-800">Changes to Terms</h3>
      <p>We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
    </>
  );
}

function CookiePolicyContent() {
  return (
    <>
      <p>Lokalads uses cookies and similar tracking technologies to enhance your browsing experience and analyse how our platform is used.</p>
      <h3 className="font-semibold text-slate-800">What Are Cookies?</h3>
      <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you interact with our platform.</p>
      <h3 className="font-semibold text-slate-800">Types of Cookies We Use</h3>
      <p><strong>Essential Cookies:</strong> Required for the platform to function properly, such as keeping you logged in.</p>
      <p><strong>Analytics Cookies:</strong> Help us understand how visitors use our site so we can improve it.</p>
      <p><strong>Preference Cookies:</strong> Remember your settings and preferences for a better experience.</p>
      <h3 className="font-semibold text-slate-800">Managing Cookies</h3>
      <p>You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our platform.</p>
      <h3 className="font-semibold text-slate-800">Third-Party Cookies</h3>
      <p>Some third-party services we use may also set cookies. These are governed by the respective third parties&apos; privacy policies.</p>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const [activeSheet, setActiveSheet] = useState<"privacy" | "conditions" | "cookies" | null>(null);

  return (
    <footer className="bg-slate-800 border-t-4 border-rose-500">

      {/* Company Info & Collapsable Footer */}
      <details className="group container mx-auto flex max-sm:flex-col flex-row flex-nowrap gap-2 px-4 py-4 max-w-screen-lg">

        {/* Summary */}
        <summary className="cursor-pointer flex flex-col items-stretch justify-center">
          <div className="flex items-center justify-between">
            <Link className="flex gap-2 items-center" href="/">
              <Image className="size-11" src="/assets/la-logo-symbol-black.svg" alt="logo" width={44} height={44} />
              <div className="relative">
                <Image className="w-24" src="/assets/la-text-white.svg" alt="logo" width={96} height={32} />
                <span className="absolute right-1 -bottom-4 text-[11px] font-semibold text-white">India</span>
              </div>
            </Link>

            <div className="size-10 flex items-center justify-center text-white bg-slate-800 hover:bg-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </div>
          </div>
          <p className="text-slate-300 text-sm font-normal mt-2">find anything with lokalads, its just secure..</p>
        </summary>

        {/* Collapsable Links Grid */}
        <div className="flex-1 pt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex-1 mb-5">
            <div className="mb-2 text-sm text-slate-200 font-bold">Resources</div>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/tutorials">Tutorials</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/faq">Frequent Questions (FAQ)</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/support">
              Support <span className="text-teal-200 text-xs p-1">New</span>
            </Link>
          </div>
          <div className="flex-1 mb-5">
            <div className="mb-2 text-sm text-slate-200 font-bold">Popular Category</div>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/category/property">Property</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/category/jobs">Jobs</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/category/for-sale">
              For Sale <span className="text-teal-200 text-xs p-1">New</span>
            </Link>
          </div>
          <div className="flex-1 mb-5">
            <div className="mb-2 text-sm text-slate-200 font-bold">Top Locations</div>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/location/london">London</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/location/bristol">Bristol</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/location/scotland">
              Scotland <span className="text-teal-200 text-xs p-1">New</span>
            </Link>
          </div>
          <div className="flex-1 mb-5">
            <div className="mb-2 text-sm text-slate-200 font-bold">About Us</div>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/about">About lokalads</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/advertise">Why to Advertise With Us?</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/careers">Careers</Link>
            <Link className="my-1 block text-sm text-slate-300 hover:text-white" href="/contact">
              Contact <span className="text-teal-200 text-xs p-1">New</span>
            </Link>
          </div>
        </div>
      </details>

      {/* Social Media & Legal */}
      <div className="relative flex pb-5 px-4 sm:px-12 m-auto text-gray-800 text-sm flex-col max-w-screen-lg items-center">
        <hr className="absolute w-48 h-px border-slate-500" />

        {/* Social Icons */}
        <div className="md:flex-auto mt-4 flex-row flex max-sm:px-4">
          <Link href="https://twitter.com" target="_blank" className="w-6 mx-1">
            <svg className="fill-current cursor-pointer text-slate-400 hover:text-slate-200" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd" }}>
              <path d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627 5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-6.465,-3.192c-0.379,0.168 -0.786,0.281 -1.213,0.333c0.436,-0.262 0.771,-0.676 0.929,-1.169c-0.408,0.242 -0.86,0.418 -1.341,0.513c-0.385,-0.411 -0.934,-0.667 -1.541,-0.667c-1.167,0 -2.112,0.945 -2.112,2.111c0,0.166 0.018,0.327 0.054,0.482c-1.754,-0.088 -3.31,-0.929 -4.352,-2.206c-0.181,0.311 -0.286,0.674 -0.286,1.061c0,0.733 0.373,1.379 0.94,1.757c-0.346,-0.01 -0.672,-0.106 -0.956,-0.264c-0.001,0.009 -0.001,0.018 -0.001,0.027c0,1.023 0.728,1.877 1.694,2.07c-0.177,0.049 -0.364,0.075 -0.556,0.075c-0.137,0 -0.269,-0.014 -0.397,-0.038c0.268,0.838 1.048,1.449 1.972,1.466c-0.723,0.566 -1.633,0.904 -2.622,0.904c-0.171,0 -0.339,-0.01 -0.504,-0.03c0.934,0.599 2.044,0.949 3.237,0.949c3.883,0 6.007,-3.217 6.007,-6.008c0,-0.091 -0.002,-0.183 -0.006,-0.273c0.413,-0.298 0.771,-0.67 1.054,-1.093Z" />
            </svg>
          </Link>
          <Link href="https://facebook.com" target="_blank" className="w-6 mx-1">
            <svg className="fill-current cursor-pointer text-slate-400 hover:text-slate-200" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd" }}>
              <path d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627 5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422 0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784 -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z" />
            </svg>
          </Link>
          <Link href="https://youtube.com" target="_blank" className="w-6 mx-1">
            <svg className="fill-current cursor-pointer text-slate-400 hover:text-slate-200" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd" }}>
              <g>
                <circle cx="12" cy="12" r="12" />
                <path d="M19.05,8.362c0,-0.062 0,-0.125 -0.063,-0.187l0,-0.063c-0.187,-0.562 -0.687,-0.937 -1.312,-0.937l0.125,0c0,0 -2.438,-0.375 -5.75,-0.375c-3.25,0 -5.75,0.375 -5.75,0.375l0.125,0c-0.625,0 -1.125,0.375 -1.313,0.937l0,0.063c0,0.062 0,0.125 -0.062,0.187c-0.063,0.625 -0.25,1.938 -0.25,3.438c0,1.5 0.187,2.812 0.25,3.437c0,0.063 0,0.125 0.062,0.188l0,0.062c0.188,0.563 0.688,0.938 1.313,0.938l-0.125,0c0,0 2.437,0.375 5.75,0.375c3.25,0 5.75,-0.375 5.75,-0.375l-0.125,0c0.625,0 1.125,-0.375 1.312,-0.938l0,-0.062c0,-0.063 0,-0.125 0.063,-0.188c0.062,-0.625 0.25,-1.937 0.25,-3.437c0,-1.5 -0.125,-2.813 -0.25,-3.438Zm-4.634,3.927l-3.201,2.315c-0.068,0.068 -0.137,0.068 -0.205,0.068c-0.068,0 -0.136,0 -0.204,-0.068c-0.136,-0.068 -0.204,-0.204 -0.204,-0.34l0,-4.631c0,-0.136 0.068,-0.273 0.204,-0.341c0.136,-0.068 0.272,-0.068 0.409,0l3.201,2.316c0.068,0.068 0.136,0.204 0.136,0.34c0.068,0.136 0,0.273 -0.136,0.341Z" style={{ fill: "rgb(0,0,0)" }} />
              </g>
            </svg>
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="w-6 mx-1">
            <svg className="fill-current cursor-pointer text-slate-400 hover:text-slate-200" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd" }}>
              <path d="M7.3,0.9c1.5,-0.6 3.1,-0.9 4.7,-0.9c1.6,0 3.2,0.3 4.7,0.9c1.5,0.6 2.8,1.5 3.8,2.6c1,1.1 1.9,2.3 2.6,3.8c0.7,1.5 0.9,3 0.9,4.7c0,1.7 -0.3,3.2 -0.9,4.7c-0.6,1.5 -1.5,2.8 -2.6,3.8c-1.1,1 -2.3,1.9 -3.8,2.6c-1.5,0.7 -3.1,0.9 -4.7,0.9c-1.6,0 -3.2,-0.3 -4.7,-0.9c-1.5,-0.6 -2.8,-1.5 -3.8,-2.6c-1,-1.1 -1.9,-2.3 -2.6,-3.8c-0.7,-1.5 -0.9,-3.1 -0.9,-4.7c0,-1.6 0.3,-3.2 0.9,-4.7c0.6,-1.5 1.5,-2.8 2.6,-3.8c1.1,-1 2.3,-1.9 3.8,-2.6Zm-0.3,7.1c0.6,0 1.1,-0.2 1.5,-0.5c0.4,-0.3 0.5,-0.8 0.5,-1.3c0,-0.5 -0.2,-0.9 -0.6,-1.2c-0.4,-0.3 -0.8,-0.5 -1.4,-0.5c-0.6,0 -1.1,0.2 -1.4,0.5c-0.3,0.3 -0.6,0.7 -0.6,1.2c0,0.5 0.2,0.9 0.5,1.3c0.3,0.4 0.9,0.5 1.5,0.5Zm1.5,10l0,-8.5l-3,0l0,8.5l3,0Zm11,0l0,-4.5c0,-1.4 -0.3,-2.5 -0.9,-3.3c-0.6,-0.8 -1.5,-1.2 -2.6,-1.2c-0.6,0 -1.1,0.2 -1.5,0.5c-0.4,0.3 -0.8,0.8 -0.9,1.3l-0.1,-1.3l-3,0l0.1,2l0,6.5l3,0l0,-4.5c0,-0.6 0.1,-1.1 0.4,-1.5c0.3,-0.4 0.6,-0.5 1.1,-0.5c0.5,0 0.9,0.2 1.1,0.5c0.2,0.3 0.4,0.8 0.4,1.5l0,4.5l2.9,0Z" />
            </svg>
          </Link>
        </div>

        {/* Legal Links — clicking opens bottom drawer */}
        <div className="flex flex-row flex-wrap items-center justify-center p-2 text-slate-300 text-center">
          <p className="inline-block py-1 text-nowrap">©&nbsp; 2025 lokalads | Co. Reg. No. 8765412345.</p>
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-slate-300 mx-2"><circle cx="1" cy="1" r="1" /></svg>
          <button
            onClick={() => setActiveSheet("privacy")}
            className="py-1 text-nowrap text-slate-300 hover:text-white underline underline-offset-2 cursor-pointer"
          >
            Privacy Policy
          </button>
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-slate-300 mx-2"><circle cx="1" cy="1" r="1" /></svg>
          <button
            onClick={() => setActiveSheet("conditions")}
            className="py-1 text-nowrap text-slate-300 hover:text-white underline underline-offset-2 cursor-pointer"
          >
            Conditions
          </button>
          <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" className="fill-slate-300 mx-2"><circle cx="1" cy="1" r="1" /></svg>
          <button
            onClick={() => setActiveSheet("cookies")}
            className="py-1 text-nowrap text-slate-300 hover:text-white underline underline-offset-2 cursor-pointer"
          >
            Cookie Policy
          </button>
        </div>
      </div>

      {/* Donation Section */}
      <div className="bg-white">
        <div className="container mx-auto bg-white px-12 py-3 flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-center text-center max-w-screen-lg">
          <p className="text-lg text-slate-700 italic">&quot;Your support makes lokalads possible. Lets grow together!&quot;</p>
          <Link
            className="pl-4 pr-1.5 py-1 border bg-yellow-400 hover:bg-yellow-500 rounded-full border-yellow-500 text-lg text-yellow-900 font-semibold flex items-center justify-center gap-2"
            href="/donate"
          >
            <span>Support Lokalads</span>
            <span className="p-1 rounded-full bg-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Bottom Drawers ── */}
      <Sheet open={activeSheet === "privacy"} onClose={() => setActiveSheet(null)} title="Privacy Policy">
        <PrivacyPolicyContent />
      </Sheet>
      <Sheet open={activeSheet === "conditions"} onClose={() => setActiveSheet(null)} title="Terms & Conditions">
        <ConditionsContent />
      </Sheet>
      <Sheet open={activeSheet === "cookies"} onClose={() => setActiveSheet(null)} title="Cookie Policy">
        <CookiePolicyContent />
      </Sheet>

    </footer>
  );
}
"use client";

import { useState } from "react";
import { useCountry } from "@/components/country/CountryProvider";

export default function CookiePolicyContent() {
  const { country } = useCountry();

  const isUK = country === "UK";
  const isSG = country === "SG";
  const isIN = country === "IN";

  const [open, setOpen] = useState(false);

  const sections = [
    {
      title: "",
      content:
        "Welcome to Lokalads.com! This Cookie Policy explains how we use cookies and similar technologies on our website. Our goal is to give you the best browsing experience while keeping your privacy protected and transparent.",
    },
    {
      title: "1. What Are Cookies?",
      content:
        "Cookies are small text files placed on your device (computer, tablet, or phone) when you visit a website. They help the site remember your preferences, improve functionality, and analyse usage so we can make Lokalads better for everyone.",
    },
    {
      title: "2. Types of Cookies We Use",
      subSections: [
        {
          title: "a. Essential Cookies",
          points: [
            "Necessary for Lokalads to function properly",
            "Example: login, drafts, privacy settings",
            "Cannot be disabled",
          ],
        },
        {
          title: "b. Performance & Analytics Cookies",
          points: [
            "Help us understand user behavior",
            "Improve performance and usability",
            "Example: Google Analytics (anonymised)",
          ],
        },
        {
          title: "c. Functionality Cookies",
          points: [
            "Remember your preferences",
            "Example: location, filters, language",
          ],
        },
        {
          title: "d. Advertising & Marketing Cookies",
          points: [
            "Show relevant ads",
            "May be set by third parties",
            "Can be disabled in settings",
          ],
        },
      ],
    },
    {
      title: "3. Managing Your Cookie Preferences",
      content:
        "When you first visit Lokalads.com, you’ll see a cookie banner where you can Accept All, Reject Non-Essential, or Manage Preferences. You can update your choices anytime from the footer.",
      list: [
        "Accept All Cookies – full experience",
        "Reject Non-Essential – only required cookies",
        "Manage Preferences – choose manually",
      ],
    },
    {
      title: "Browser Controls",
      list: ["Chrome", "Safari", "Firefox", "Edge"],
    },
    {
      title: "4. Third-Party Cookies",
      content:
        "Some cookies are set by third-party services like social media, embedded content, or advertising networks. We do not control these cookies.",
    },
    {
      title: "5. Cookies by Country",
      table: true,
    },
    {
      title: "6. Updates to This Policy",
      content:
        "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. We will always show the latest update date at the top of this page.",
    },
    {
      title: "7. Contact Us",
      content:
        "If you have any questions about our cookie use or this policy, please contact us at privacy@lokalads.com.",
    },
  ];

  const cookieTable = [
    {
      name: "_session_id",
      type: "Essential",
      purpose: "Keeps user logged in",
      duration: "Session",
      provider: "Lokalads",
    },
    {
      name: "remember_me",
      type: "Functional",
      purpose: "Remembers login preference",
      duration: "30 days",
      provider: "Lokalads",
    },
    {
      name: "_ga",
      type: "Analytics",
      purpose: "Tracks user behaviour",
      duration: "2 years",
      provider: "Google",
    },
    {
      name: "_gid",
      type: "Analytics",
      purpose: "Tracks page views",
      duration: "24 hours",
      provider: "Google",
    },
    {
      name: "ad_personalisation",
      type: "Marketing",
      purpose: "Shows relevant ads",
      duration: "90 days",
      provider: "Third-party",
    },
  ];

  const countryRules = [
    {
      region: "United Kingdom (UK)",
      usage: "Full compliance with UK GDPR and PECR",
      consent: "Explicit consent (Accept / Reject / Manage)",
    },
    {
      region: "Singapore (SG)",
      usage: "Transparency-focused",
      consent: "Soft consent banner",
    },
    {
      region: "India (IN)",
      usage: "DPDP-aligned approach",
      consent: "Notice + optional control",
    },
  ];

  const filteredCookies = cookieTable.filter((c) => {
    if (isUK) return true;
    if (isSG) return c.type !== "Marketing";
    if (isIN) return c.type !== "Marketing";
    return true;
  });

  return (
    <div className="space-y-6">

      {/* Last Updated */}
      <p className="text-xs text-gray-500">
        Last updated: April 2026
      </p>

      {/* Country Notice */}
      <div className="p-3 rounded-md bg-slate-100 text-sm">
        {isUK && <p>GDPR compliant cookie usage with full control.</p>}
        {isSG && <p>We use cookies to improve your experience.</p>}
        {isIN && <p>We use cookies with optional control.</p>}
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">

          {section.title && (
            <h3 className="font-semibold text-slate-800">
              {section.title}
            </h3>
          )}

          {section.content && <p>{section.content}</p>}

          {section.list && (
            <ul className="list-disc pl-5 space-y-1">
              {section.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {section.subSections && (
            <div className="space-y-3">
              {section.subSections.map((sub, i) => (
                <div key={i}>
                  <h4 className="font-medium text-slate-700">
                    {sub.title}
                  </h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {sub.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Country Table */}
          {section.table && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-2">Region</th>
                    <th className="p-2">How We Apply Cookies</th>
                    <th className="p-2">Consent Method</th>
                  </tr>
                </thead>
                <tbody>
                  {countryRules.map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{row.region}</td>
                      <td className="p-2">{row.usage}</td>
                      <td className="p-2">{row.consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      ))}

      {/* Cookie Table */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-800">📊 Cookie Details</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2">Cookie</th>
                <th className="p-2">Type</th>
                <th className="p-2">Purpose</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Provider</th>
              </tr>
            </thead>
            <tbody>
              {filteredCookies.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.type}</td>
                  <td className="p-2">{c.purpose}</td>
                  <td className="p-2">{c.duration}</td>
                  <td className="p-2">{c.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        {(isUK || isIN) && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 border rounded"
          >
            Manage Preferences
          </button>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">

            <h3 className="text-lg font-semibold">Cookie Preferences</h3>

            <div className="space-y-3">
              <label className="flex justify-between">
                <span>Essential</span>
                <input type="checkbox" checked disabled />
              </label>
              <label className="flex justify-between">
                <span>Analytics</span>
                <input type="checkbox" />
              </label>
              <label className="flex justify-between">
                <span>Marketing</span>
                <input type="checkbox" />
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="border px-3 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.setItem("cookieConsent", "saved");
                  setOpen(false);
                }}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
/**
 * AppHeader — la design system common application header.
 *
 * Variants:
 *   "default" — full header: Logo + POST CTA + Favourites sheet + Avatar menu
 *   "simple"  — minimal header: Logo + Avatar menu only
 *
 * Usage:
 *   <AppHeader variant="default" />
 *   <AppHeader variant="simple" />
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AvatarDropdown } from "@/components/avatar/AvatarDropdown";
import { LaFavouriteThumbnail } from "@/components/la-blocks/la-thumbnail-favourites";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetCloseButton,
} from "@/components/ui/sheet";
import {
  Outline_Heart_24by24,
  Solid_Heart_24by24,
} from "@/components/icons/la-icons";
import { cn } from "@/lib/utils";

const NOW = Date.now();

const INITIAL_FAVS = [
  {
    id: "1",
    image: { src: "/images/img2.jpg", alt: "Corner terrace house" },
    priceLabel: "$3,200",
    priceSuffix: "pcm",
    title: "Bright 3-Bed Corner Terrace in Serangoon",
    detailsLabel: "3 BEDS • 2 BATHS • TERRACE",
    locationLabel: "Serangoon, Singapore",
    postedAt: NOW - 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: "2",
    image: { src: "/images/img3.jpg", alt: "Modern condo" },
    priceLabel: "$1,850,000",
    title: "Modern 2-Bed High-Floor Condo with City View",
    detailsLabel: "2 BEDS • 2 BATHS • CONDO",
    locationLabel: "Orchard, Singapore",
    postedAt: NOW - 7 * 24 * 60 * 60 * 1000,
    status: "closed" as const,
  },
  {
    id: "3",
    image: { src: "/images/img4.jpg", alt: "Semi-D property" },
    priceLabel: "$5,600",
    priceSuffix: "pcm",
    title: "Spacious Semi-D with Private Garden",
    detailsLabel: "5 BEDS • 4 BATHS • SEMI-D",
    locationLabel: "Bukit Timah, Singapore",
    postedAt: NOW - 35 * 24 * 60 * 60 * 1000,
    status: "off-market" as const,
  },
];

export type AppHeaderVariant = "default" | "simple";

export default function AppHeader({ variant = "default" }: { variant?: AppHeaderVariant }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [favs, setFavs] = useState(INITIAL_FAVS);
  const count = favs.length;

  function handleRemove(id: string) {
    setFavs((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <header className="border-b border-slate-200 shadow-md shadow-gray-300">

      {/* Main App Header */}
      <div className="bg-white">
        <div className="container mx-auto h-16 flex items-center px-4 max-w-5xl">
          <Link className="flex gap-2 items-center" href="#">
            <Image src="/assets/la-logo-symbol-color.svg" alt="lokalads logo" width={40} height={40} />
            <div className="relative max-sm:hidden">
              <Image src="/assets/la-text-black.svg" alt="lokalads" width={96} height={24} />
            </div>
          </Link>

          <div className="flex-1" />

          <div className="flex-1" />

          <div className="h-full flex items-center gap-2">

            {/* Post CTA — mobile icon only */}
            {variant === "default" && (
            <Link
              href="#"
              className="size-7 bg-rose-500 hover:bg-rose-600 flex items-center justify-center rounded-full text-white text-sm font-medium mr-2 sm:hidden"
            >
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
            </Link>
            )}

            {/* Post CTA — desktop pill */}
            {variant === "default" && (
            <Link
              href="#"
              className="bg-rose-500 hover:bg-rose-600 flex items-center rounded-full text-white text-sm font-medium pl-2 pr-3 py-1 shadow-sm max-sm:hidden mr-2"
            >
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              POST
            </Link>
            )}

            {/* Favourites */}
            {variant === "default" && (
              <button
                aria-label={sheetOpen ? "Close favourites" : "View saved listings"}
                aria-expanded={sheetOpen}
                onClick={() => setSheetOpen((v) => !v)}
                className={cn(
                  "relative hover:bg-slate-100 flex items-center justify-center flex-none w-11 max-sm:w-9 h-full transition-colors",
                  sheetOpen ? "text-rose-500" : "text-slate-600"
                )}
              >
                <span className="relative inline-flex">
                  {sheetOpen
                    ? <Solid_Heart_24by24 className="size-7" />
                    : <Outline_Heart_24by24 className="size-7" strokeWidth={1.5} />
                  }
                  {count > 0 && (
                    <span className="pointer-events-none absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold tabular-nums text-white">
                      {count > 9 ? "9+" : count}
                    </span>
                  )}
                </span>
              </button>
            )}

            {/* Avatar */}
            <div className="flex items-center px-1">
              <AvatarDropdown
                name="Gopinath Krishnamoorthi"
                subtitle="Member"
                initials="GK"
                status="offline" />
            </div>

          </div>
        </div>
      </div>

      {/* Favourites Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <div>
              <SheetTitle>Favourites</SheetTitle>
              <SheetDescription>
                {count > 0 ? `${count} saved listings` : "No saved listings"}
              </SheetDescription>
            </div>
            <SheetCloseButton />
          </SheetHeader>
          <div className="flex-1 overflow-y-auto bg-slate-50 px-5 pb-2">
            <div className="divide-y divide-slate-100">
              {favs.map((item) => (
                <LaFavouriteThumbnail
                  key={item.id}
                  image={item.image}
                  priceLabel={item.priceLabel}
                  priceSuffix={item.priceSuffix}
                  title={item.title}
                  detailsLabel={item.detailsLabel}
                  locationLabel={item.locationLabel}
                  postedAt={item.postedAt}
                  status={item.status}
                  onRemove={() => handleRemove(item.id)}
                />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </header>
  );
}

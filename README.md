# LokalAds — Next.js Project

This is the **LokalAds** classified ads platform converted from a static HTML/Tailwind CSS project into a **Next.js 14** app using the App Router.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  ← Root layout (wraps all pages)
│   ├── globals.css                 ← Global styles + Tailwind
│   ├── page.tsx                    ← Home page (/)
│   ├── login/page.tsx              ← Sign In (/login)
│   ├── listing/page.tsx            ← Search Results (/listing)
│   ├── post/page.tsx               ← Ad Detail (/post)
│   └── donate/
│       ├── page.tsx                ← Donate (/donate)
│       ├── review/page.tsx         ← Donate Review (/donate/review)
│       └── status/page.tsx         ← Payment Success (/donate/status)
└── components/
    └── Header.tsx                  ← Shared header component
public/
└── assets/                         ← All SVGs, images, logos
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — search hero + category grid |
| `/login` | Sign In page |
| `/listing` | Search results with filter sidebar |
| `/post` | Ad detail page with gallery, seller info |
| `/donate` | Donation amount selection |
| `/donate/review` | Payment review (QR / Credit Card tabs) |
| `/donate/status` | Payment confirmation |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **next/image** for optimised images
- **next/link** for client-side navigation

## Notes

- The `donate/review` page uses `'use client'` for interactive tab switching (QR vs Credit Card).
- Images are in `/public/assets/` — referenced as `/assets/...` in code.
- To connect real data, replace the static `listings` array in `/listing/page.tsx` with an API call.
- The map placeholder in `/post/page.tsx` can be replaced with `@react-google-maps/api` or `leaflet`.

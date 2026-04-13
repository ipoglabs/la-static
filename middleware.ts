import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  COUNTRY_COOKIE,
  PENDING_COOKIE,
  PENDING_MAX_AGE,
  isSupportedCountry,
} from "@/lib/country-context";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const existing = request.cookies.get(COUNTRY_COOKIE)?.value ?? "";
  if (isSupportedCountry(existing)) {
    return response;
  }

  // No cookie → flag for client-side IP detection (only if not already flagged)
  const alreadyPending = request.cookies.get(PENDING_COOKIE)?.value;
  if (!alreadyPending) {
    response.cookies.set(PENDING_COOKIE, "1", {
      path: "/",
      maxAge: PENDING_MAX_AGE,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

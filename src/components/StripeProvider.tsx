// components/StripeProvider.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

let stripePromise: Promise<Stripe | null>;

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
}

interface StripeProviderProps {
  clientSecret: string;
  children: ReactNode;
}

export default function StripeProvider({
  clientSecret,
  children,
}: StripeProviderProps) {
  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#6366f1", // match your app accent color
      colorBackground: "#ffffff",
      colorText: "#1f2937",
      colorDanger: "#ef4444",
      fontFamily: "inherit",
      borderRadius: "8px",
    },
  };

  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance }}
    >
      {children}
    </Elements>
  );
}

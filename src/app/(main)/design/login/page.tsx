"use client";

/**
 * ─── Login Snippet ────────────────────────────────────────────────────────────
 * File: app/snippets/login/page.tsx
 *
 * Two-step login flow:
 *   Step 1  →  User enters email OR phone, presses "Continue"
 *   Step 2  →  Password field appears, user presses "Sign in"
 *
 * ─── INTEGRATION GUIDE ───────────────────────────────────────────────────────
 *
 * 1. AUTHENTICATION
 *    Replace the `mockAuthenticate()` function at the top of this file with your
 *    real API call. Expected signature:
 *
 *      async function authenticate(identifier: string, password: string)
 *        : Promise<{ ok: boolean; error?: string }>
 *
 *    The `identifier` is either an email string or a phone number in E.164 format
 *    (e.g. "+66812345678"). Normalise on your backend as needed.
 *
 * 2. POST-LOGIN REDIRECT
 *    On success, the form calls `router.push("/")`. Replace "/" with your
 *    authenticated home route (e.g. "/dashboard").
 *
 * 3. GOOGLE LOGIN
 *    `handleGoogleLogin()` is a stub. Replace with:
 *      import { signIn } from "next-auth/react";
 *      signIn("google", { callbackUrl: "/dashboard" });
 *
 * 4. LINKS
 *    "Sign up" and "Forgot password" are plain <a> placeholders.
 *    Replace with Next.js <Link href="/signup"> and <Link href="/forgot-password">.
 *
 * 5. DEMO CREDENTIALS
 *    Email/phone: any valid format
 *    Password:    "123456"  →  success
 *                 anything else  →  shake + error
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { COUNTRIES, type Country } from "@/lib/data/countries";
import PhoneNumberInput from "@/components/phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { IconEye, IconEyeOff } from "@/components/icons/inline";
import { useToast } from "@/components/ui/toast";

// ─── MOCK AUTH — replace this with your real API call ────────────────────────
async function mockAuthenticate(
  identifier: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 1200));

  // ✅ Demo: password "123456" always succeeds
  if (password === "123456") return { ok: true };

  // ❌ Everything else fails
  return { ok: false, error: "Incorrect password. Try 123456 for the demo." };
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── MOCK GOOGLE LOGIN — replace with signIn("google") ───────────────────────
async function mockGoogleLogin(): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
  // Replace with: signIn("google", { callbackUrl: "/dashboard" });
}
// ─────────────────────────────────────────────────────────────────────────────

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const toast = useToast();

  // ── Identifier step ──────────────────────────────────────────────────────
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [identifierTouched, setIdentifierTouched] = useState(false);

  // ── Password step ────────────────────────────────────────────────────────
  const [step, setStep] = useState<"identifier" | "password">("identifier");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // ── Loading / error ──────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [shake, setShake] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────
  const emailValid = useMemo(() => isValidEmail(email), [email]);
  const phoneValid = useMemo(
    () => isValidPhone(phone, country?.minLen ?? 6),
    [phone, country]
  );
  const identifierValid = method === "email" ? emailValid : phoneValid;
  const identifier = method === "email" ? email : phone;

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleMethodChange(next: "email" | "phone") {
    setMethod(next);
    setEmail("");
    setPhone("");
    setIdentifierTouched(false);
    setLoginError("");
    // Stay on step 1 if switching method
    if (step === "password") {
      setStep("identifier");
      setPassword("");
      setPasswordTouched(false);
    }
  }

  function handleContinue(e?: React.FormEvent) {
    e?.preventDefault();
    setIdentifierTouched(true);
    if (!identifierValid) return;
    setLoginError("");
    setPassword("");
    setPasswordTouched(false);
    setStep("password");
  }

  async function handleSignIn(e?: React.FormEvent) {
    e?.preventDefault();
    setPasswordTouched(true);
    if (password.length < 6) return;

    setLoading(true);
    setLoginError("");

    const result = await mockAuthenticate(identifier, password);
    setLoading(false);

    if (result.ok) {
      toast.push({ title: "Welcome back! Signing you in…" });
      // ← Replace "/" with your post-login route
      router.push("/");
    } else {
      setLoginError(result.error ?? "Something went wrong. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    await mockGoogleLogin();
    setGoogleLoading(false);
    toast.push({ title: "Google login — wire up your OAuth provider." });
  }

  // ── Error visibility ──────────────────────────────────────────────────────
  const showIdentifierError = identifierTouched && !identifierValid;
  const showPasswordError = passwordTouched && password.length < 6;

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card
        className={cn(
          "shadow-[0_0_12px_rgba(0,0,0,0.45)] border-gray-200 rounded-2xl",
          shake && "animate-shake ring-2 ring-red-400"
        )}
      >
        <CardHeader className="pb-0 mb-3">
          <CardTitle className="text-lg font-semibold text-slate-800 tracking-tight mb-1">
            Login to your account
          </CardTitle>
          {step === "identifier" ? (
            <CardDescription className="text-sm tracking-tight">
              Choose your preferred login method
            </CardDescription>
          ) : (
            <div className="mt-2">
              <p className="italic text-sm text-slate-800">Enter your password for</p>
              <p className="text-sm font-semibold text-slate-900 bg-slate-100 rounded-md px-3 h-10 flex items-center mt-1 truncate">
                {method === "email" ? email : phone}
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {loading ? (
            /* ── Loading skeleton ── */
            <div className="space-y-4 animate-pulse">
              <div className="h-6 bg-slate-100 rounded w-1/3" />
              <div className="h-10 bg-slate-100 rounded" />
              <div className="h-10 bg-slate-100 rounded" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
            </div>
          ) : step === "identifier" ? (
            /* ── Step 1: Identifier ── */
            <form onSubmit={handleContinue} className="space-y-3" noValidate>
              <fieldset aria-label="Sign in method">
                <RadioGroup
                  value={method}
                  onValueChange={(v) => handleMethodChange(v as "email" | "phone")}
                  className="flex gap-3 mt-1"
                >
                  <label htmlFor="method-email" className="flex items-center gap-1.5 px-1 py-1 cursor-pointer">
                    <RadioGroupItem id="method-email" value="email" />
                    <span className="text-sm text-slate-800">Email</span>
                  </label>
                  <label htmlFor="method-phone" className="flex items-center gap-1.5 px-1 py-1 cursor-pointer">
                    <RadioGroupItem id="method-phone" value="phone" />
                    <span className="text-sm text-slate-800">Phone</span>
                  </label>
                </RadioGroup>
              </fieldset>

              {method === "email" ? (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginError("");
                    }}
                    onBlur={() => {
                      setIdentifierTouched(true);
                      setEmail((s) => s.trim());
                    }}
                    placeholder="you@example.com"
                    aria-describedby={showIdentifierError ? "email-error" : undefined}
                    aria-invalid={showIdentifierError}
                  />
                  {showIdentifierError && (
                    <p id="email-error" role="alert" className="text-sm italic text-red-500 mt-0">
                      {email.length === 0 ? "Please enter your email." : "That email looks off."}
                    </p>
                  )}
                </Field>
              ) : (
                <Field>
                  <PhoneNumberInput
                    id="phone"
                    label="Phone"
                    value={phone}
                    onChange={(digits) => {
                      setPhone(digits);
                      setLoginError("");
                    }}
                    defaultCountry={country.code}
                    onCountryChange={(c) => {
                      const next = COUNTRIES.find((ct) => ct.code === c.code) ?? COUNTRIES[0];
                      setCountry(next as Country);
                    }}
                    inputClassName={cn(
                      identifierTouched && !phoneValid ? "ring-1 ring-red-400" : ""
                    )}
                    inputDescribedBy={showIdentifierError ? "phone-error" : undefined}
                    maxLength={country?.maxLen}
                  />
                  {showIdentifierError && (
                    <p id="phone-error" role="alert" className="text-sm italic text-red-500 mt-0">
                      {phone.trim().length === 0
                        ? "Please enter your phone number."
                        : "That number seems too short."}
                    </p>
                  )}
                </Field>
              )}

              <Button type="submit" className="w-full">Continue</Button>

              {/* ── Divider ── */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 shrink-0">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* ── Google login ── */}
              <Button
                type="button"
                variant="outline"
                className="text-sm w-full bg-slate-200 border-slate-300 hover:bg-slate-300"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                {googleLoading ? "Connecting…" : "Continue with Google"}
              </Button>

              <div className="text-center pb-1">
                <FieldDescription className="text-md">
                  New user?{" "}
                  {/* Replace with <Link href="/signup"> */}
                  <a href="#" className="font-semibold text-slate-800">Sign up</a>
                </FieldDescription>
              </div>
            </form>
          ) : (
            /* ── Step 2: Password ── */
            <form onSubmit={handleSignIn} className="space-y-4" noValidate>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* Replace with <Link href="/forgot-password"> */}
                  <a href="#" className="text-xs text-slate-500 hover:text-slate-800">
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError("");
                    }}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="Enter your password"
                    className="pr-10"
                    aria-describedby={
                      showPasswordError
                        ? "password-error"
                        : loginError
                          ? "login-error"
                          : undefined
                    }
                    aria-invalid={showPasswordError || !!loginError}
                  />
                  <button
                    type="button"
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                    onClick={() => setPasswordVisible((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {passwordVisible ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>

                {showPasswordError && (
                  <p id="password-error" role="alert" className="text-sm italic text-red-500 mt-0">
                    {password.length === 0
                      ? "Please enter your password."
                      : "Password must be at least 6 characters."}
                  </p>
                )}
                {loginError && !showPasswordError && (
                  <p id="login-error" role="alert" className="text-sm italic text-red-500 mt-0">
                    {loginError}
                  </p>
                )}
              </Field>

              <Button type="submit" className="w-full">Sign in</Button>

              {/* Back to identifier step */}
              <button
                type="button"
                onClick={() => {
                  setStep("identifier");
                  setPassword("");
                  setPasswordTouched(false);
                  setLoginError("");
                }}
                className="w-full text-base text-slate-500 hover:text-slate-800 text-center py-1 transition-colors"
              >
                ← Use a different {method}
              </button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* ── Demo hint — remove in production ── */}
      <p className="text-center text-[11px] text-slate-400">
        Demo: any valid {method} · password <span className="font-mono font-semibold">123456</span>
      </p>
    </div>
  );
}

export default function LoginSnippet() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-10 bg-[url('/bg-market-place-vintage.png')] bg-cover bg-center bg-no-repeat">
      <section className="w-full max-w-sm">
        <LoginForm />
      </section>
    </main>
  );
}

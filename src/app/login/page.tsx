"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/backend/firebase";
import { Button } from "@/components/ui/button";
import { getUserRole, getDashboardUrl } from "@/lib/auth/roleUtils";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const oppositeLinkHref = redirectUrl ? `/signup?redirect=${encodeURIComponent(redirectUrl)}` : "/signup";
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier) {
      setError("Email or Phone Number is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setIsLoading(true);
    
    try {
      const credential = await signInWithEmailAndPassword(auth, identifier, password);
      const role = await getUserRole(credential.user);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push(getDashboardUrl(role));
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(err.message || "An error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      marketingTitleLine1="Welcome Back!"
      marketingTitleLine2="Glad to see you again."
      marketingDescription="Sign in to access your bookings, track services, and make your home life easier."
      oppositeLinkText="Sign Up"
      oppositeLinkHref={oppositeLinkHref}
      oppositeLinkLabel="Don't have an account?"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
          Login to UrbanClone
        </h2>
        <p className="text-[var(--color-muted)] font-medium">
          Enter your details to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
        
        {/* Identifier Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="identifier">
            Email or Phone Number
          </label>
          <div className="relative">
            <Input
              id="identifier"
              type="text"
              placeholder="Enter your email or phone number"
              className={`pl-10 h-12 ${error && !identifier ? 'border-red-500 focus-visible:ring-red-500/20' : ''}`}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="off"
            />
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="password">
            Password
          </label>
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            className={`h-12 ${error && !password ? 'border-red-500 focus-visible:ring-red-500/20' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <div className="flex justify-end pt-1">
            <Link 
              href="/forgot-password" 
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Logging in...
            </span>
          ) : (
            "Login →"
          )}
        </Button>

      </form>

      <SocialAuthButtons />

      <div className="mt-8 text-center">
        <p className="text-xs text-[var(--color-muted)] font-medium leading-relaxed max-w-xs mx-auto">
          By continuing, you agree to our <br/>
          <Link href="/terms" className="text-[var(--color-primary)] hover:underline">Terms & Conditions</Link> and{" "}
          <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link>.
        </p>
      </div>

      <div className="mt-8">
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>
        
        <div className="text-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <p className="text-sm font-semibold text-slate-700 mb-3">Are you a service professional?</p>
          <Button variant="outline" className="w-full h-11 text-sm font-bold border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 group bg-transparent" asChild>
            <Link href="/vendor/login">
              Login as Vendor 
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Button>
        </div>
      </div>

    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
      <LoginPageContent />
    </Suspense>
  );
}

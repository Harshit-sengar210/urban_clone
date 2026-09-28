"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Phone, Loader2, Check } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/backend/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";

function SignupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const oppositeLinkHref = redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Full Name is required.");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError("Valid Email Address is required.");
    if (!phone.trim()) return setError("Phone Number is required.");
    
    const reqLength = password.length >= 8;
    const reqUpper = /[A-Z]/.test(password);
    const reqNumber = /[0-9]/.test(password);
    
    if (!reqLength || !reqUpper || !reqNumber) {
      return setError("Please ensure all password requirements are met.");
    }

    if (!termsAccepted) {
      return setError("Please accept the Terms & Conditions to continue.");
    }

    setIsLoading(true);
    
    try {
      // Use Firebase auth to create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
      
      // Write user document to Firestore with role: customer
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        email: email,
        phone: phone,
        role: "customer",
        createdAt: serverTimestamp(),
      });

      // Success - route to target or customer dashboard
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      marketingTitleLine1="Your Home."
      marketingTitleLine2="Our Priority."
      marketingDescription="Join UrbanClone and get access to trusted home services, exclusive offers and more."
      oppositeLinkText="Login"
      oppositeLinkHref={oppositeLinkHref}
      oppositeLinkLabel="Already have an account?"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
          Create Your Account
        </h2>
        <p className="text-[var(--color-muted)] font-medium">
          Get started with UrbanClone in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10 h-11"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="pl-10 h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="phone">
            Phone Number
          </label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="pl-10 h-11"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
            />
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          </div>
        </div>

        {/* Password Field with Requirements */}
        <div className="space-y-1.5 pb-2">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="password">
            Password
          </label>
          <PasswordInput
            id="password"
            placeholder="Create a password"
            className="h-11"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showRequirements={true}
            autoComplete="new-password"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 py-2">
          <button
            type="button"
            onClick={() => setTermsAccepted(!termsAccepted)}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              termsAccepted 
                ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' 
                : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]'
            }`}
          >
            {termsAccepted && <Check className="w-3.5 h-3.5" />}
          </button>
          <label className="text-sm text-[var(--color-muted)] font-medium leading-relaxed select-none cursor-pointer" onClick={() => setTermsAccepted(!termsAccepted)}>
            I agree to the <Link href="/terms" className="text-[var(--color-primary)] hover:underline" onClick={e => e.stopPropagation()}>Terms & Conditions</Link> and <Link href="/privacy" className="text-[var(--color-primary)] hover:underline" onClick={e => e.stopPropagation()}>Privacy Policy</Link>.
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 mt-4"
          disabled={isLoading || (!name || !email || !phone || !password || !termsAccepted)}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account →"
          )}
        </Button>

      </form>

      <SocialAuthButtons />

    </AuthLayout>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>}>
      <SignupPageContent />
    </Suspense>
  );
}

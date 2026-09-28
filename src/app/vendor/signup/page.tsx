"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/backend/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

export default function VendorSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        role: "vendor",
        onboardingStep: 1,
        createdAt: serverTimestamp(),
      }, { merge: true });

      await setDoc(doc(db, "vendorApplications", userCredential.user.uid), {
        vendorId: userCredential.user.uid,
        email: userCredential.user.email,
        status: "draft",
        onboardingStep: 1,
        createdAt: serverTimestamp(),
      }, { merge: true });

      const keysToClear = Object.keys(localStorage).filter(k => k.startsWith("vendor_onboarding"));
      keysToClear.forEach(k => localStorage.removeItem(k));
      
      router.push("/vendor/onboarding");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to authenticate with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError("Valid Email Address is required.");
    if (password.length < 8) return setError("Password must be at least 8 characters long.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setIsLoading(true);
    
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save vendor role in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        role: "vendor",
        onboardingStep: 1,
        createdAt: serverTimestamp(),
      });

      // Create a draft application in vendorApplications collection
      await setDoc(doc(db, "vendorApplications", userCredential.user.uid), {
        vendorId: userCredential.user.uid,
        email: email,
        status: "draft",
        onboardingStep: 1,
        createdAt: serverTimestamp(),
      });
      
      // Clear any previous vendor onboarding data from localStorage
      // so old vendor info doesn't show up for the new user
      const keysToClear = Object.keys(localStorage).filter(k => k.startsWith("vendor_onboarding"));
      keysToClear.forEach(k => localStorage.removeItem(k));
      
      // Redirect to onboarding flow
      router.push("/vendor/onboarding");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      marketingTitleLine1="Grow your business."
      marketingTitleLine2="Partner with us."
      marketingDescription="Join our platform to get access to thousands of customers looking for reliable service professionals."
      oppositeLinkText="Login"
      oppositeLinkHref="/vendor/login"
      oppositeLinkLabel="Already a partner?"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
          Become a Vendor
        </h2>
        <p className="text-[var(--color-muted)] font-medium">
          Create your account to start onboarding.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
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

        {/* Password Field */}
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

        {/* Confirm Password Field */}
        <div className="space-y-1.5 pb-2">
          <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Re-enter your password"
            className="h-11"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showRequirements={false}
            autoComplete="new-password"
          />
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
          disabled={isLoading || !email || !password || !confirmPassword}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Start Onboarding <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <SocialAuthButtons onGoogleClick={handleGoogleSignup} />

    </AuthLayout>
  );
}

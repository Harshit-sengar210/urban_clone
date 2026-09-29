"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Loader2, Briefcase, TrendingUp, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { auth, db } from "@/backend/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

export default function VendorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check vendor profile
      const vendorDoc = await getDoc(doc(db, "vendors", userCredential.user.uid));
      if (vendorDoc.exists() && vendorDoc.data()?.status === "active") {
        const keysToClear = Object.keys(localStorage).filter(k => k.startsWith("vendor_onboarding"));
        keysToClear.forEach(k => localStorage.removeItem(k));
        router.push("/vendor/dashboard");
        return;
      }

      // Check application status
      const appDoc = await getDoc(doc(db, "vendorApplications", userCredential.user.uid));
      if (appDoc.exists()) {
        const status = appDoc.data()?.status;
        if (status === "needs_changes") {
          router.push("/vendor/onboarding");
          return;
        } else if (status === "submitted" || status === "under_review" || status === "pending_approval") {
          router.push("/vendor/onboarding/pending");
          return;
        } else if (status === "rejected") {
          setError("Your application has been rejected.");
          await auth.signOut();
          setIsLoading(false);
          return;
        }
      }
      
      // If no valid application or vendor doc
      await auth.signOut();
      setError("No vendor account found. Please sign up as a partner first.");
      setIsLoading(false);
      return;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to login with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Business Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check vendor profile
      const vendorDoc = await getDoc(doc(db, "vendors", userCredential.user.uid));
      if (vendorDoc.exists() && vendorDoc.data()?.status === "active") {
        const keysToClear = Object.keys(localStorage).filter(k => k.startsWith("vendor_onboarding"));
        keysToClear.forEach(k => localStorage.removeItem(k));
        router.push("/vendor/dashboard");
        return;
      }

      // Check application status
      const appDoc = await getDoc(doc(db, "vendorApplications", userCredential.user.uid));
      if (appDoc.exists()) {
        const status = appDoc.data()?.status;
        if (status === "needs_changes" || status === "draft") {
          router.push("/vendor/onboarding");
          return;
        } else if (status === "submitted" || status === "under_review" || status === "pending_approval") {
          router.push("/vendor/onboarding/pending");
          return;
        } else if (status === "rejected") {
          setError("Your application has been rejected.");
          await auth.signOut();
          setIsLoading(false);
          return;
        }
      }
      
      // If no valid application or vendor doc
      await auth.signOut();
      setError("No vendor account found. Please sign up as a partner first.");
      setIsLoading(false);
      return;
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(err.message || "Failed to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-[#fdfcff]">

      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-[var(--color-border)] flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
            Urban<span className="text-[var(--color-primary)]">Clone</span>
          </span>
        </Link>
        <Link href="/login" className="text-sm font-semibold text-[var(--color-primary)] flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> User Login
        </Link>
      </div>

      {/* Left Panel: Marketing — hidden on mobile, fixed height on desktop */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex md:w-[45%] lg:w-[42%] flex-col justify-between p-10 lg:p-14 relative overflow-hidden h-full"
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50 to-purple-100 z-0" />

        {/* Desktop Logo */}
        <div className="relative z-10 flex justify-between items-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900 to-[var(--color-primary)] flex items-center justify-center text-white font-bold text-2xl shadow-md">
              U
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--color-foreground)]">
              Urban<span className="text-[var(--color-primary)]">Clone</span> <span className="text-slate-400 font-medium text-lg ml-1">Partner</span>
            </span>
          </Link>
        </div>

        {/* Marketing Content — centered vertically */}
        <div className="relative z-10 flex-grow flex flex-col justify-center py-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1]">
            Grow Your <br />
            <span className="text-[var(--color-primary)]">Service Business</span>
          </h1>
          <p className="text-base text-[var(--color-muted)] font-medium max-w-sm mb-12 leading-relaxed">
            Manage bookings, connect with customers, and grow your business with UrbanClone.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-500" />
              </div>
              <span className="text-lg font-bold text-slate-700">Manage Bookings</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-lg font-bold text-slate-700">Track Earnings</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-lg font-bold text-slate-700">Grow Your Customers</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel: Form — fills remaining height, scrolls internally if needed */}
      <div className="flex-1 bg-white relative z-20 flex flex-col h-full overflow-y-auto shadow-[-20px_0_40px_rgba(0,0,0,0.02)]">

        {/* Desktop Opposite Link */}
        <div className="hidden md:flex justify-end items-center gap-2 p-6 flex-shrink-0">
          <span className="text-sm text-[var(--color-muted)] font-medium">Are you a customer?</span>
          <Link href="/login" className="text-sm font-bold text-[var(--color-primary)] hover:underline flex items-center">
            Login as User <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Main Card — centered vertically in remaining space */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex-1 flex items-center justify-center px-6 py-6"
        >
          <div className="w-full max-w-[420px]">
            <div className="bg-white border border-[var(--color-border)] shadow-xl shadow-black/5 rounded-[24px] p-8">
              
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] tracking-tight mb-2">
                  Welcome, Partner
                </h2>
                <p className="text-[var(--color-muted)] font-medium">
                  Login to manage your services, bookings, and customers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
                
                {/* Identifier Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="email">
                    Business Email
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your business email"
                      className={`pl-10 h-12 ${error && !email ? 'border-red-500 focus-visible:ring-red-500/20' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <div className="flex justify-between items-center pt-1">
                    <label className="flex items-center gap-2 text-sm text-[var(--color-muted)] font-medium cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                      Remember me
                    </label>
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
                      Authenticating...
                    </span>
                  ) : (
                    "Login as Vendor →"
                  )}
                </Button>

              </form>

              <SocialAuthButtons onGoogleClick={handleGoogleLogin} />

              <div className="mt-8 text-center bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-500 font-medium mb-2">
                  New to UrbanClone?
                </p>
                <Link href="/vendor/signup" className="text-sm font-bold text-[var(--color-primary)] hover:underline inline-flex items-center group">
                  Become a Partner 
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

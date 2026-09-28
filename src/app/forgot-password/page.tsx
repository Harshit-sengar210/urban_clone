"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 w-full h-[50vh] bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[400px] relative z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-2xl shadow-md">
              U
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--color-foreground)]">
              Urban<span className="text-[var(--color-primary)]">Clone</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-[var(--color-border)] shadow-xl shadow-black/5 rounded-[24px] p-8 md:p-10">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] tracking-tight mb-2 text-center">
              Reset Password
            </h1>
            <p className="text-[var(--color-muted)] text-sm font-medium text-center">
              {isSuccess 
                ? "We've sent a password reset link to your email."
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[var(--color-foreground)]" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                  />
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <Button 
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => {
                  setIsSuccess(false);
                  setEmail("");
                }}
              >
                Try another email
              </Button>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Link href="/login" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

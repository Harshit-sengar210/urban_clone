"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/backend/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (pathname.match(/^\/(login|signup|forgot-password|dashboard|vendor|admin)/)) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#FAF9F6]/95 backdrop-blur-md py-3 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border-b border-slate-200/50"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            U
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--color-foreground)]">
            Urban<span className="text-[var(--color-primary)]">Clone</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[var(--color-primary)] font-bold"
                  : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
            <MapPin className="w-4 h-4" />
            <span>New Delhi</span>
          </button>
          <div className="w-px h-5 bg-[var(--color-border)]" />
          
          {!authLoading ? (
            user ? (
              <>
                <Link href="/dashboard">
                  <Button size="sm" className="ml-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">Dashboard</Button>
                </Link>
                <div className="flex flex-col items-end cursor-pointer group relative">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-[var(--color-primary)] font-bold text-sm border-2 border-transparent group-hover:border-[var(--color-primary)] transition-all overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  {/* Simple Dropdown for Logout */}
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button 
                      onClick={() => auth.signOut()}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">
                  Login
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="ml-2">Sign Up</Button>
                </Link>
              </>
            )
          ) : (
            <div className="w-32 h-9 bg-slate-100 animate-pulse rounded-md ml-2"></div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[var(--color-foreground)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[var(--color-border)] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-foreground)] py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-[var(--color-border)]" />
              <div className="flex items-center gap-2 text-sm font-medium py-2 text-[var(--color-muted)]">
                <MapPin className="w-4 h-4" />
                <span>New Delhi</span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                {!authLoading && user ? (
                  <>
                    <div className="flex items-center gap-3 py-2 px-1 mb-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-[var(--color-primary)] font-bold flex items-center justify-center">
                         {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{user.displayName || user.email}</span>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center">Dashboard</Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-center text-rose-600 hover:text-rose-700 border-rose-200" onClick={() => { auth.signOut(); setIsMobileMenuOpen(false); }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">Login</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.match(/^\/(login|signup|forgot-password|dashboard|vendor|admin)/)) {
    return null;
  }

  return (
    <footer className="bg-[#0A0F1E] text-slate-300 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                U
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Urban<span className="text-[var(--color-primary-light)]">Clone</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-slate-400">
              Your trusted marketplace for all home services. We connect you with top-rated professionals for everything your home needs.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { name: "Twitter", d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { name: "Instagram", d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
                { name: "Linkedin", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }
              ].map((social, i) => (
                <a key={i} href="#" aria-label={social.name} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    {social.name === "Instagram" && <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>}
                    {social.name === "Instagram" && <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>}
                    {social.name === "Linkedin" && <rect width="4" height="12" x="2" y="9"/>}
                    {social.name === "Linkedin" && <circle cx="4" cy="4" r="2"/>}
                    <path d={social.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '#' },
                { name: 'How It Works', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Vendor Login', href: '/vendor/login' },
                { name: 'Admin Login', href: '/admin/login' }
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Home Cleaning', 'AC & Appliances', 'Beauty & Salon', 'Plumbing', 'Electrician'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4 mb-6">
              {['Help Center', 'Contact Us', 'Cancellation Policy', 'Trust & Safety'].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-[var(--color-primary-light)]" />
              <a href="mailto:support@urbanclone.com" className="hover:text-white transition-colors">
                support@urbanclone.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} UrbanClone. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-400">App Store</div>
            <div className="w-32 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-400">Google Play</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SplashScreen } from "@/components/splash/SplashScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UrbanClone | Home Services. Simplified.",
  description: "Book trusted professionals for cleaning, repairs, beauty, maintenance and more — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} style={{ scrollBehavior: 'smooth' }}>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <SplashScreen />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

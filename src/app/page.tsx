
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  const pageTitle = "Invoicing App - Manage Your Invoices Effortlessly";
  const pageDescription = "Effortlessly manage and track your invoices with the best invoicing app.";

  return (
    <>
      {/* ✅ SEO Metadata & Open Graph Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/og-image.png" /> {/* Replace with your actual image */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/twitter-image.png" /> {/* Replace with actual image */}

        {/* ✅ Structured Data (JSON-LD for SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Invoicing App",
              "url": "https://yourdomain.com",
              "description": pageDescription,
            }),
          }}
        />
      </Head>

      {/* ✅ Razorpay Script (Lazy Load for Performance) */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      {/* ✅ Main Content */}
      <main className="relative flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto px-4">
        {/* ✅ Background Image (Performance-Optimized) */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/d5d097115109437.60481e35e5dd9.png" // Replace with an optimized background
            alt="Background"
            fill
            className="object-cover opacity-40"
            priority // Loads ASAP for better performance
          />
        </div>

        {/* ✅ Glassmorphism Effect */}
        <div className="bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/20">
          <h1 className="text-5xl font-extrabold text-gray-800 animate-fade-in mb-4 drop-shadow-md">
            Invoice App
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            Effortlessly manage and track your invoices!
          </p>

          {/* ✅ CTA Button (Optimized for Accessibility & UX) */}
          <Button
            asChild
            className="px-6 py-3 text-lg font-semibold transition duration-300 transform bg-indigo-500 hover:bg-indigo-600 hover:scale-105 focus:ring-4 focus:ring-indigo-300"
          >
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

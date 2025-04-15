
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Enhanced metadata for SEO & Social Media previews
export const metadata: Metadata = {
  title: {
    default: "Invoicing App",
    template: "%s | Invoicing App",
  },
  description: "Easily manage and track your invoices with our invoicing app.",
  openGraph: {
    title: "Invoicing App",
    description: "Easily manage and track your invoices with our invoicing app.",
    url: "https://invoicing-application-model.vercel.app", // Replace with your actual domain
    siteName: "Invoicing App",
    images: [
      {
        url: "/og-image.png", // Ensure you have this image in your public folder
        width: 1200,
        height: 630,
        alt: "Invoicing App Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoicing App",
    description: "Easily manage and track your invoices with our invoicing app.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* ✅ JSON-LD Structured Data for SEO */}
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Invoicing App",
                url: "https://invoicing-application-model.vercel.app",
                description: "Easily manage and track your invoices with our invoicing app.",
                image: "/og-image.png",
              }),
            }}
          />

          {/* ✅ Razorpay Script (Optimized Loading) */}
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

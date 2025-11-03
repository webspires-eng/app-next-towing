import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: [
    {
      path: "../../public/fonts/geist/geist-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/geist/geist-latin-ext.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/geist/geist-mono-latin.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/geist/geist-mono-latin-ext.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Next Towing | 24/7 Emergency Car Recovery & Towing Service",
    template: "%s | Next Towing"
  },
  description: "Professional 24/7 car recovery and towing service across the UK. Fast response, fixed pricing, fully insured. Call now for immediate roadside assistance.",
  keywords: ["towing", "car recovery", "roadside assistance", "breakdown recovery", "vehicle recovery", "emergency towing"],
  authors: [{ name: "Next Towing" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
    siteName: "Next Towing",
    title: "Next Towing | 24/7 Emergency Car Recovery & Towing Service",
    description: "Professional 24/7 car recovery and towing service across the UK. Fast response, fixed pricing, fully insured.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Towing | 24/7 Emergency Car Recovery & Towing Service",
    description: "Professional 24/7 car recovery and towing service across the UK.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

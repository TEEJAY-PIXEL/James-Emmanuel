import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "./components/cookie-consent";

export const metadata: Metadata = {
  title: "James | E-commerce & Analytics Specialist",
  description:
    "James helps businesses build better Shopify, Wix and WordPress websites, and set up Google Merchant Center, Google Analytics and GA4.",
  icons: { icon: "https://hxppdwwsfukoavfcsdtu.supabase.co/storage/v1/object/public/IMAGES/james-emmanuel-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<CookieConsent /></body>
    </html>
  );
}
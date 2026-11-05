import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "./components/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://james-emmanuel-xi.vercel.app"),
  title: { default: "James Emmanuel | Google Merchant Center & E-commerce Specialist", template: "%s | James Emmanuel" },
  description:
    "James Emmanuel helps e-commerce businesses address Google Merchant Center suspensions, misrepresentation, product disapprovals and website compliance, alongside websites and analytics.",
  openGraph: { type: "website", siteName: "James Emmanuel", url: "/", title: "James Emmanuel | GMC & E-commerce Specialist", description: "Google Merchant Center suspension, misrepresentation and e-commerce support." },
  robots: { index: true, follow: true },
  icons: { icon: "https://hxppdwwsfukoavfcsdtu.supabase.co/storage/v1/object/public/IMAGES/James%20Emmanuel%20Ecommerce%20Brand%20Identity.png" },
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
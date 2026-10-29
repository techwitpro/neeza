import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://neeza.restaurant"),
  title: "NEEZA — A Celebration of Flavor",
  description: "Experience a new era of fine dining inspired by creativity, comfort, and elegance. Serious craft, intentional flavors.",
  icons: {
    icon: "/assets/header_logo.svg",
  },
  openGraph: {
    title: "NEEZA — A Celebration of Flavor",
    description: "Fine dining & culinary experience. Artisanal plates, seasonal dinners, and craft cellar.",
    images: ["/assets/hero_bg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/assets/header_logo.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col bg-[#1D1D02] text-[#F0EDCC] antialiased selection:bg-[#F36E3F] selection:text-white">
        {children}
      </body>
    </html>
  );
}

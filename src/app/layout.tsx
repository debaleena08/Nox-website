import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TextReveal } from "@/components/TextReveal";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nox-website-three.vercel.app"),
  title: "Nox - Motion Design for Tech Teams",
  description:
    "Clarity-first motion graphics for complex products. Launch videos, product demos, and explainers built around your launches and campaigns. 7-day delivery.",
  icons: {
    icon: "/images/nox-mark.svg",
    apple: "/images/nox-icon.png",
  },
  openGraph: {
    title: "Nox - Motion Design for Tech Teams",
    description:
      "Clarity-first motion graphics for complex products. Launch videos, product demos, and explainers built around your launches and campaigns. 7-day delivery.",
    type: "website",
    images: [{ url: "/seo/ogimage.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-nox-white focus:text-nox-black focus:px-4 focus:py-2 focus:font-mono focus:text-[0.75rem] focus:tracking-[0.04em]"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <ScrollReveal />
        <TextReveal />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

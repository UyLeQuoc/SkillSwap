import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WrappedLayout from "./wrapped-layout";
import { Toaster } from "@/components/ui/sonner";
import { generateSEO } from "@/components/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEO({
  title: "SkillSwap - Web3 Skill Exchange Platform in HCMC",
  description: "Connect, share, and exchange skills within HCMC's vibrant decentralized community. Trade skills, learn from others, and build your reputation through NFT SkillBadges.",
  keywords: [
    "SkillSwap",
    "skill exchange",
    "Web3",
    "HCMC",
    "Sui blockchain",
    "skill trading",
    "NFT badges",
    "community learning",
    "peer-to-peer exchange",
    "skill verification",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WrappedLayout>
          {children}
          <Toaster />
        </WrappedLayout>
      </body>
    </html>
  );
}

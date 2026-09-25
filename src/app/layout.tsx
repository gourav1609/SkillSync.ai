import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ThreeBackground from "@/components/ThreeBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SkillSync AI — Adaptive Learning Platform",
  description: "AI-powered adaptive education that continuously personalizes your learning path based on what you actually understand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-transparent antialiased relative" suppressHydrationWarning>
        <ThreeBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";

import { QuotesProvider } from "@/context/QuoteContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/Nav";
import { AuthProvider } from "./AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Random Quotes",
  description: "A tiny random quotes app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <header className="border-b px-4 py-3 flex justify-between items-center bg-gray-200 dark:bg-gray-900/70">
              <h1 className="text-lg font-bold">
                {/* <a href="/">Random Quotes</a> */}
                <Link href="/" prefetch={false}>
                  Random Quotes
                </Link>
              </h1>
              <Nav />
            </header>
            <main>
              <QuotesProvider>{children}</QuotesProvider>
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

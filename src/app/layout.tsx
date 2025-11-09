import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QuotesProvider } from "@/context/QuoteContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/Nav";
import { AuthProvider } from "./AuthProvider";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <ThemeProvider>
          <AuthProvider>
            <header className="border-b px-4 py-3 bg-gray-200 dark:bg-gray-900/70">
              <Nav />
            </header>
            <main>
              <QuotesProvider>{children}</QuotesProvider>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

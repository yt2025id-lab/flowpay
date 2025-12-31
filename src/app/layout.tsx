import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowPay - Automated Crypto Payments",
  description: "Recurring payments and subscriptions powered by MetaMask Advanced Permissions (ERC-7715)",
  keywords: ["crypto", "payments", "subscription", "metamask", "erc-7715", "web3"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950`}
      >
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}

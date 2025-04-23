import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/landing/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Fanlynx",
  description: "Fanlynx is a platform for creating and managing fan tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThirdwebProvider>
          <main className="min-h-screen bg-gray-900 text-white">
          <Navbar />
            {children}
          </main>
        </ThirdwebProvider>
        <Toaster />
      </body>
    </html>
  );
}

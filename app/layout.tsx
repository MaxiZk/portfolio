import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "Máximo Zuidwijk | Software Engineer",
  description: "Building tools that catch security vulnerabilities automatically.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      style={{
        "--font-space-grotesk": spaceGrotesk.style.fontFamily,
        "--font-inter": inter.style.fontFamily,
      } as React.CSSProperties}
    >
      <body className="bg-brand-cream text-brand-dark font-sans antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

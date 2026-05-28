import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hai, Atel 🌸",
  description: "Ada yang mau gua tanyain...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream-100 overflow-y-auto">
        {children}

        <Toaster
          position="top-center"
          richColors
        />
      </body>
    </html>
  );
}
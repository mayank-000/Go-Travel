import type { Metadata } from "next";
import { Sora, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorManager from "@/components/CursorManager";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "JUNO — India's First Invite-Only Experiential Journey Club",
  description:
    "A quiet circle of people who choose depth over noise, and making over scrolling.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${dmSerif.variable} antialiased`}>
        {/* Custom cursor element */}
        <div id="juno-cursor" />
        
        {/* Cursor movement manager */}
        <CursorManager />
        
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
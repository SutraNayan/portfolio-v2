import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import DistortionCanvas from "@/components/3d/DistortionCanvas";
import { Suspense } from "react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Nayan | Spatial Storytelling Portfolio",
  description: "An ultra-premium AI learning journey portfolio powered by Next.js, Spline, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} font-sans text-foreground antialiased selection:bg-cyan-500/30 selection:text-white relative bg-transparent`}>
        <Suspense fallback={null}>
          <DistortionCanvas />
        </Suspense>
        <NoiseOverlay />
        <LenisProvider>
          <NavBar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

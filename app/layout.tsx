import type { Metadata } from "next";
import { Playfair_Display, Inter, Vazirmatn } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Nav } from "@/components/molecules/Nav";
import { Footer } from "@/components/molecules/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "دیزاین استیشن — معماری زیست لاکچری",
  description:
    "دیزاین استیشن، مرجع وارداتی برترین برندهای شیرآلات، خانه‌های هوشمند و عناصر معماری در پالادیوم تهران.",
  metadataBase: new URL("https://designstation.example"),
  openGraph: {
    title: "Design Station",
    description: "Architectural Hub · Palladium, Tehran",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${playfair.variable} ${inter.variable} ${vazirmatn.variable}`}
    >
      <body className="bg-bone text-ink antialiased">
        <LenisProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

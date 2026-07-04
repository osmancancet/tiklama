import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TIKLA(MA)! — İnsan Zihnini Hackleme Sanatı",
  description: "İnsan doğasının güncellenemeyen tek zafiyet olduğu gerçeğini interaktif simülasyonlarla deneyimleyin. 30 bölüm, 30 farklı sosyal mühendislik saldırısı.",
  keywords: "siber güvenlik, sosyal mühendislik, phishing, hacking, güvenlik farkındalık, interaktif eğitim",
  authors: [{ name: "Osman Can Çetlenbik" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

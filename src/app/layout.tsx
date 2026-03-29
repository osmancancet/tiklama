import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TIKLA(MA)! — İnsan Zihnini Hackleme Sanatı",
  description: "İnsan doğasının güncellenemeyen tek zafiyet olduğu gerçeğini interaktif simülasyonlarla deneyimleyin. 25 bölüm, 25 farklı sosyal mühendislik saldırısı.",
  keywords: "siber güvenlik, sosyal mühendislik, phishing, hacking, güvenlik farkındalık, interaktif eğitim",
  authors: [{ name: "Osman Can Çetlenbik" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="matrix-bg antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

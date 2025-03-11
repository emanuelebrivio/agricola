import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexendSans = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Azienda Agricola Brivio Società Agricola",
  description: "Coltiviamo con passione prodotti genuini, seguendo la tradizione e il rispetto per la natura. Scopri la qualità direttamente dalla nostra terra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendSans.variable}`}>
        {children}
      </body>
    </html>
  );
}

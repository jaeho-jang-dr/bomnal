import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Manrope, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import CartManager from "@/components/cart/CartManager";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const gloria = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloria",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senior Shop",
  description: "Surgeon-Led Senior Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${gloria.variable} antialiased font-display`}
      >
        <AuthProvider>
          <CartManager />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

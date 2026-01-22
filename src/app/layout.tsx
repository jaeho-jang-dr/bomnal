import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import "./globals.css";
import CartManager from "@/components/cart/CartManager";
import GlobalUI from "@/components/layout/GlobalUI";
import Footer from "@/components/layout/Footer";

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
      <body className={`antialiased font-display font-sans flex flex-col min-h-screen`}>
        <AuthProvider>
          <GlobalUI />
          <CartManager />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

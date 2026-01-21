"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { CartIcon } from "@/components/cart/CartIcon";
import { CartView } from "@/components/cart/CartView";
import { HeroVideoBackground } from "@/components/home/HeroVideoBackground";
import { getProducts } from "@/lib/firebase/firestore";

// Optimized Components
import { CategoryChips } from "@/components/home/CategoryChips";
import { DirectorTrust } from "@/components/home/DirectorTrust";
import { TrendingProducts, DisplayProduct } from "@/components/home/TrendingProducts";
import { TrustSignals } from "@/components/home/TrustSignals";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuthContext();
  const [products, setProducts] = useState<DisplayProduct[]>([]);

  useEffect(() => {
    // Performance Agent: Consider caching strategies or ISR in the future
    const fetchProducts = async () => {
      const productList = (await getProducts()) as DisplayProduct[];
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <CartView isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="bg-background-light dark:bg-background-dark font-display text-text-main antialiased selection:bg-primary selection:text-white pb-24 min-h-screen">
        {/* Sticky Top Navigation */}
        <nav className="sticky top-0 z-50 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "24px" }}
                >
                  medical_services
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-text-main dark:text-white">
                Senior Shop
              </h1>
            </div>
            <Link
              href={user ? "/orders" : "/login"}
              className="flex items-center justify-center text-text-main dark:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
              aria-label={user ? "My Orders" : "Login"}
            >
              <span className="material-symbols-outlined">{user ? 'person' : 'login'}</span>
            </Link>
            <CartIcon onClick={() => setIsCartOpen(true)} />
          </div>
        </nav>

        {/* Hero Section */}
        < header className="relative w-full overflow-hidden" >
          <div className="relative h-[420px] w-full">
            <HeroVideoBackground />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-30"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 flex flex-col items-start gap-4 z-40">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/20 backdrop-blur-sm px-3 py-1">
                <span className="text-xs font-medium text-white tracking-wide uppercase">
                  신규 컬렉션
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight max-w-[80%]">
                관절 건강을 위한 전문 케어
              </h2>
              <p className="text-lg text-gray-200 font-medium max-w-[90%]">
                닥터 스미스가 제안하는 일상의 편안함을 위한 정형외과적 솔루션.
              </p>
              <button className="mt-2 flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-lg transition-transform active:scale-95 cursor-pointer">
                컬렉션 보기
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Home Page Content Components */}
        < CategoryChips />
        <DirectorTrust />
        <TrendingProducts products={products} />
        <TrustSignals />

        {/* Safe area spacing for phones with home indicators */}
        <div className="h-6"></div>
      </div >
    </>
  );
}

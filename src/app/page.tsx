"use client";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuthContext } from "@/context/AuthContext";
import { signOutUser } from "@/lib/firebase/auth";
import { CartIcon } from "@/components/cart/CartIcon";
import { CartView } from "@/components/cart/CartView";
import { useCartStore } from "@/store/cartStore";
import { HeroVideoBackground } from "@/components/home/HeroVideoBackground";
import { getProducts } from "@/lib/firebase/firestore";
import { Product } from "@/store/cartStore";

interface DisplayProduct extends Product {
  description: string;
  tag?: string;
}

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useAuthContext();
  const addItemToCart = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState<DisplayProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = (await getProducts()) as DisplayProduct[];
      setProducts(productList);
    };
    fetchProducts();
  }, []);



  return (
    <>
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
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
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center text-text-main dark:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer">
                <span className="material-symbols-outlined">search</span>
              </button>
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative w-full overflow-hidden">
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
        {/* Category Chips (Horizontal Scroll) */}
        <section className="py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar snap-x">
            {/* Active Chip */}
            <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  accessibility_new
                </span>
              </div>
              <span className="text-sm font-semibold text-text-main dark:text-white">
                전체
              </span>
            </div>
            {/* Inactive Chips */}
            <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-muted flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  health_and_safety
                </span>
              </div>
              <span className="text-sm font-medium text-text-muted">무릎</span>
            </div>
            <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-muted flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  align_horizontal_center
                </span>
              </div>
              <span className="text-sm font-medium text-text-muted">허리</span>
            </div>
            <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-muted flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  front_hand
                </span>
              </div>
              <span className="text-sm font-medium text-text-muted">손목</span>
            </div>
            <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-muted flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  footprint
                </span>
              </div>
              <span className="text-sm font-medium text-text-muted">발</span>
            </div>
            <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer pr-4">
              <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-muted flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  compress
                </span>
              </div>
              <span className="text-sm font-medium text-text-muted">양말</span>
            </div>
          </div>
        </section>

        {/* Director's Trust Section */}
        <section className="mx-4 my-6 rounded-3xl bg-secondary dark:bg-gray-800 p-6 shadow-sm overflow-hidden relative">
          {/* Abstract Background Decoration */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 dark:bg-white/5 rounded-full blur-2xl"></div>
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="relative mb-4">
              <div
                className="size-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md bg-cover bg-center"
                data-alt="Dr. Smith looking reassuringly at the camera"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcTC8ERDW2HQcl43sneWtwqWsiFtSzRIIHL2PjyRy4hHTX6yh1YgLlTr0_VpOiBLsUnMYNRozaiqv1DRf7PWQBTeW3lFOUh7c3g8q-xFM6Q6u-MKdw8AHYn8Q7INPsXz3BsfKwVJyT_L94I6Yf0PW9zc1nM_uvDSyzO3-PcQH63q2JNGI3pKBhLyDaJ_7pNeBo6VcK2AzpdC2hqCL_ARRknAMBH9MKslc9fR6sUndWtwdPfFIQFKkmwVQB-tAa0hn2I1lhAS3T62k")',
                }}
              ></div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-secondary dark:border-gray-800">
                <span className="material-symbols-outlined text-sm block">
                  verified
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
              닥터 스미스의 한마디
            </h3>
            <p className="text-text-main/80 dark:text-gray-300 text-base font-medium leading-relaxed mb-4 italic">
              "판매하는 모든 보호대와 지지대는 제가 직접 검증합니다. 제 가족에게 처방할 수 없는 제품이라면, 이곳에서 판매하지 않습니다."
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl text-primary signature-text opacity-90">
                Dr. Sarah Smith
              </span>
              <p className="text-xs uppercase tracking-widest font-bold text-text-muted">
                대표 원장 & 수석 외과 전문의
              </p>
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-main dark:text-white">
              의사 추천 상품
            </h2>
            <a
              className="text-sm font-bold text-primary hover:text-primary-dark"
              href="/shop"
            >
              전체 보기
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-soft border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all"
              >
                {product.tag && (
                  <div className="absolute top-3 left-3 z-10 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {product.tag}
                  </div>
                )}
                <div className="aspect-square w-full rounded-xl bg-gray-50 dark:bg-gray-700 mb-3 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center mix-blend-multiply dark:mix-blend-normal"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-bold text-text-main dark:text-white leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-text-muted mb-3">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-text-main dark:text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addItemToCart(product)}
                      className="bg-primary/10 hover:bg-primary text-primary hover:text-white size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Signals */}
        <section className="px-6 py-8 mt-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                local_shipping
              </span>
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                간편<br />
                반품
              </p>
            </div>
            <div className="w-px bg-gray-100 dark:bg-gray-800 h-12 self-center"></div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                verified_user
              </span>
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                의료기기<br />
                인증
              </p>
            </div>
            <div className="w-px bg-gray-100 dark:bg-gray-800 h-12 self-center"></div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                medical_information
              </span>
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                전문의<br />
                검증
              </p>
            </div>
          </div>
        </section>

        {/* Safe area spacing for phones with home indicators */}
        <div className="h-6"></div>
      </div>
    </>
  );
}

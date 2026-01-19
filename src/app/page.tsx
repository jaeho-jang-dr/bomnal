"use client";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuthContext } from "@/context/AuthContext";
import { signOutUser } from "@/lib/firebase/auth";
import { CartIcon } from "@/components/cart/CartIcon";
import { CartView } from "@/components/cart/CartView";
import { useCartStore } from "@/store/cartStore";

// Dummy product data for demonstration
const products = [
  {
    id: "1",
    name: "Pro Knee Stabilizer",
    price: 45.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVO6EaCRNTKsY6p4T8VCCdOv-OAdUchFm0oN9tBP_eZbdg7sdQALz8Tn9H_fb0YgPDA45LhqPlTa8GKYZzV45M19tVll1YOXBPsiBaMXtav8nWHuRHeQq1oU4akjZXmXeBjo2_qYq-kzMHlFNo9jyWI0pgiS3p42VD_sqXNkz9_zgB-jhO0Q_7gelhV9gJdrcXQAlf4fyl13Rh8rrZn3jGmCDbUmLxyw17xHlXOOM_CNZ6e6boIPGoUO_6njs_ffECSNLeQWERy7U",
    description: "Maximum support for arthritis",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Wrist Relief Band",
    price: 24.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmGYhSP52FTYIfLeSJ9579KXeGAZv4gwgGAfLW2W36RUsOoNI7dcOaZD-yvUWbkei1M1RXQFmUU09yEkWdnihfkW23_hwjdUKzUNv08zZ-I-RfsBIBYvOhj93s3voQnqZbAULFOyUHKvrrYk2XSNxM1c_NvHCEvPXPuSXhX5zXir6FhbbdtMa_kNSvKEYVoj0W5eppSZ9qTXeP6sN3BXXVq4LWxkvPwLm2L32W4aIF9vAXtwrfRL-Z8gG8gon-xuYoJif8fM4BQ1Y",
    description: "Soft compression fabric",
  },
  {
    id: "3",
    name: "Lumbar Ease Belt",
    price: 59.99,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJzUOUZRoJ2dUs84r26vDySkdAvvrguEGwcP-ihdZPTSe0jcnOJAj2wl-xZXhc4eVy_Uoe0ss9tvOB3iL09EoRX8L0yl5Tn0jNUE2yYeAlaVEeHD9b0BcPzC73eYsg5kixozI2uX294tHmNbkZA9gO71AqQTkDDmQ-OB3NOxGk6rq06OoogmCnl0UqQb92jRY6IaFf3hXX7Ov1FmpEbmyWn7qN60eFM5tGL2SVBR4I14HrUNwJEIZJMiAlHA3OYOQPmWBluOldjtw",
    description: "Adjustable fit for lower back",
  },
  {
    id: "4",
    name: "Daily Compression Socks",
    price: 18.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Jh2Fuj9nCOYNhWdP127GnI0wlvSaSybEGK28NGG4SbcbZns03dMDDN40rkWjmDs6b4xmnAWajylsQHUzTC1aE-wypUh5wXuKOHM1n61LUx-1xk5DWmt8lYozIOBkIfOIojL-xRzo_y9sG9u8SvkCpGoHn3IJUL58zyDbLneXvNKxprWUgvU7lRgwEUaG062Took_rcQnmpqTn550iQMz1dpEHTO8MwqJYBtzObifASa2IhogNIFAmx9cjg8W70sCXVSoG_ofKa8",
    description: "Improves circulation",
  },
];

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useAuthContext();
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleProfileClick = () => {
    if (user) {
      signOutUser();
    } else {
      setIsAuthModalOpen(true);
    }
  };

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
          <div
            className="absolute inset-0 bg-gray-200"
            data-alt="Senior couple walking happily in a park with autumn leaves"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAwLKZgOWUF3pmh0rDPPbUJWJFEK7cKk9fQwcGcz-AhaiMGx5fkpnJKdBL9ikS-2Kes8wx9ciw7O9dYCBZfWJALrXzmQ36jB7zKm0mfbzmOlA9v4oDAFS5ewRFQc__VB6LdFtnT4rSl-5FWKGi_jzDnhugRjwRnS8FrZkvsmFckD134yvsTyU343CCSqnq8Uy6ImyLbOLjxBOPttiKtaEmr5J8_M5J5bhjqRj_dNx784vopZbvvQgyGbHQRxumpkz66M0UzCrIOzI8")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 flex flex-col items-start gap-4">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/20 backdrop-blur-sm px-3 py-1">
              <span className="text-xs font-medium text-white tracking-wide uppercase">
                New Collection
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight max-w-[80%]">
              Expert Care for Your Joints
            </h2>
            <p className="text-lg text-gray-200 font-medium max-w-[90%]">
              Orthopedic solutions curated by Dr. Smith for your daily comfort.
            </p>
            <button className="mt-2 flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-lg transition-transform active:scale-95 cursor-pointer">
              Shop Collection
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
                All
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
              <span className="text-sm font-medium text-text-muted">Knee</span>
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
              <span className="text-sm font-medium text-text-muted">Back</span>
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
              <span className="text-sm font-medium text-text-muted">Wrist</span>
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
              <span className="text-sm font-medium text-text-muted">Foot</span>
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
              <span className="text-sm font-medium text-text-muted">Socks</span>
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
              A Note from Dr. Smith
            </h3>
            <p className="text-text-main/80 dark:text-gray-300 text-base font-medium leading-relaxed mb-4 italic">
              "I personally verify every brace and support we sell. If I wouldn't
              prescribe it to my own family, you won't find it here."
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl text-primary signature-text opacity-90">
                Dr. Sarah Smith
              </span>
              <p className="text-xs uppercase tracking-widest font-bold text-text-muted">
                Director &amp; Lead Surgeon
              </p>
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-main dark:text-white">
              Doctor Recommended
            </h2>
            <a
              className="text-sm font-bold text-primary hover:text-primary-dark"
              href="/shop"
            >
              See all
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
                Easy<br />
                Returns
              </p>
            </div>
            <div className="w-px bg-gray-100 dark:bg-gray-800 h-12 self-center"></div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                verified_user
              </span>
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                Medicare<br />
                Approved
              </p>
            </div>
            <div className="w-px bg-gray-100 dark:bg-gray-800 h-12 self-center"></div>
            <div className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                medical_information
              </span>
              <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                Surgeon<br />
                Verified
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 safe-bottom pt-2 px-2 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-around pb-2">
            <button className="flex flex-col items-center gap-1 p-2 text-primary cursor-pointer">
              <span
                className="material-symbols-outlined filled"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                home
              </span>
              <span className="text-[10px] font-bold">Home</span>
            </button>
            <a
              href="/shop"
              className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">grid_view</span>
              <span className="text-[10px] font-medium">Shop</span>
            </a>
            <button className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">menu_book</span>
              <span className="text-[10px] font-medium">Advice</span>
            </button>
            <button
              onClick={handleProfileClick}
              className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
              disabled={loading}
            >
              <span className="material-symbols-outlined">
                {user ? "logout" : "person"}
              </span>
              <span className="text-[10px] font-medium">
                {loading ? "..." : user ? "Logout" : "Profile"}
              </span>
            </button>
          </div>
        </nav>
        {/* Safe area spacing for phones with home indicators */}
        <div className="h-6"></div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
}

import { useCartStore } from "@/store/cartStore";
import { useFavoriteStore } from "@/store/favoriteStore";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
}

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
    onClick: (product: Product) => void;
}

export function ProductCard({ product, onAdd, onClick }: ProductCardProps) {
    const { isFavorite, toggleFavorite } = useFavoriteStore();
    const { items } = useCartStore();

    const isFav = isFavorite(product.id);
    const isInCart = items.some(item => item.id === product.id);

    return (
        <div
            onClick={() => onClick(product)}
            className="group rx-pad-card rounded-b-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            {/* Tag Badge */}
            <div className="absolute top-2 left-0 z-20 flex justify-center items-center gap-1 pl-2 bg-white/90 backdrop-blur-sm pr-2 py-1 rounded-r-lg shadow-sm">
                <span className="material-symbols-outlined gold-cross text-[20px] font-bold text-grid-primary">
                    verified
                </span>
                <span className="text-xs uppercase tracking-wide text-slate-700 font-serif font-bold">
                    Dr.Jang Pick
                </span>
            </div>

            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                }}
                className="absolute top-2 right-2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm"
            >
                <span className={`material-symbols-outlined text-[24px] transition-transform active:scale-95 ${isFav ? "text-red-500 fill-current" : ""}`} style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}>
                    favorite
                </span>
            </button>

            {/* Image Area */}
            <div className="relative aspect-[4/5] w-full bg-gray-50 flex items-center justify-center rx-vignette mt-2 rounded-t-lg overflow-hidden">
                <Image
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                    src={product.image || "https://placehold.co/400x500/e2e8f0/64748b?text=No+Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Content Card */}
            <div className="relative z-10 px-4 pb-5 pt-4 flex flex-col gap-2 bg-white/95 backdrop-blur-md -mt-4 mx-2 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="font-bold text-lg text-slate-800 dark:text-gray-100 leading-tight line-clamp-2 h-auto min-h-[3rem]">
                    {product.name}
                </h3>
                <div className="flex items-end justify-between mt-1">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-bold mb-0.5">
                            가격
                        </span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                            ₩{product.price.toLocaleString()}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(product);
                        }}
                        className={`h-11 w-11 flex items-center justify-center rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer ${isInCart
                            ? "bg-green-100 text-green-700 ring-2 ring-green-500 ring-offset-1"
                            : "bg-grid-primary hover:bg-grid-primary-dark text-white shadow-primary/20"
                            }`}
                        title={isInCart ? "장바구니에 담겨있습니다" : "장바구니 담기"}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isInCart ? "shopping_cart_checkout" : "add_shopping_cart"}
                        </span>
                    </button>
                    {/* Visual Badge overlay for In Cart? Maybe overkill. The green ring is good. */}
                </div>
            </div>
        </div>
    );
}

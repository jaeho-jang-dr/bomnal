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
            <div className="absolute top-2 left-0 z-20 flex justify-center items-center gap-1 pl-2">
                <span className="material-symbols-outlined gold-cross text-lg font-bold text-grid-primary">
                    verified
                </span>
                <span className="text-[8px] uppercase tracking-widest text-slate-400 font-serif font-bold">
                    Dr.Jang Pick
                </span>
            </div>

            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                }}
                className="absolute top-2 right-2 z-20 size-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
            >
                <span className={`material-symbols-outlined text-xl transition-transform active:scale-95 ${isFav ? "text-red-500 fill-current" : ""}`} style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}>
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
            <div className="relative z-10 px-3 pb-4 pt-3 flex flex-col gap-1 bg-white/90 backdrop-blur-sm -mt-4 mx-2 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="font-bold text-sm text-slate-800 dark:text-gray-100 leading-tight line-clamp-2 h-10">
                    {product.name}
                </h3>
                <div className="flex items-end justify-between mt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium mb-0.5">
                            가격
                        </span>
                        <span className="text-base font-bold text-slate-900 dark:text-white font-sans">
                            ₩{product.price.toLocaleString()}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(product);
                        }}
                        className={`h-9 w-9 flex items-center justify-center rounded-lg shadow-lg transition-all active:scale-95 cursor-pointer ${isInCart
                            ? "bg-green-100 text-green-600 ring-2 ring-green-500 ring-offset-1"
                            : "bg-grid-primary hover:bg-grid-primary-dark text-white shadow-primary/20"
                            }`}
                        title={isInCart ? "장바구니에 담겨있습니다" : "장바구니 담기"}
                    >
                        <span className="material-symbols-outlined text-lg">
                            {isInCart ? "shopping_cart_checkout" : "add_shopping_cart"}
                        </span>
                    </button>
                    {/* Visual Badge overlay for In Cart? Maybe overkill. The green ring is good. */}
                </div>
            </div>
        </div>
    );
}

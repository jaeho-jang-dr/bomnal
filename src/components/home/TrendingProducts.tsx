"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/store/cartStore";

export interface DisplayProduct extends Product {
    description: string;
    tag?: string;
}

interface TrendingProductsProps {
    products: DisplayProduct[];
}

export const TrendingProducts = ({ products }: TrendingProductsProps) => {
    const addItemToCart = useCartStore((state) => state.addItem);

    return (
        <section className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-text-main dark:text-white">
                    의사 추천 상품
                </h2>
                <Link
                    className="text-sm font-bold text-primary hover:text-primary-dark"
                    href="/shop"
                >
                    전체 보기
                </Link>
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
                        {/* Optimized Image Container */}
                        <div className="relative aspect-square w-full rounded-xl bg-gray-50 dark:bg-gray-700 mb-3 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <h3 className="text-base font-bold text-text-main dark:text-white leading-tight mb-1">
                                {product.name}
                            </h3>
                            <p className="text-xs text-text-muted mb-3 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-lg font-bold text-text-main dark:text-white">
                                    ${product.price.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => {
                                        addItemToCart(product);
                                        window.alert(`${product.name}이(가) 장바구니에 담겼습니다.`);
                                    }}
                                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                                    aria-label={`Add ${product.name} to cart`}
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
    );
};

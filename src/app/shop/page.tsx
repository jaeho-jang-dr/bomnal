"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { CartBadge } from "@/components/layout/CartBadge";
import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/lib/firebase/firestore";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryFilter } from "@/components/shop/CategoryFilter";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
}

const CATEGORIES = [
    { id: 'all', name: '전체' },
    { id: 'mobility', name: '이동/안전' },
    { id: 'daily', name: '생활/돌봄' },
    { id: 'fashion', name: '패션/편의' },
    { id: 'health', name: '건강/힐링' },
];

export default function Shop() {
    const addItem = useCartStore((state) => state.addItem);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data as Product[]);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter Logic (Memoized for performance)
    const filteredProducts = useMemo(() => {
        return selectedCategory === 'all'
            ? products
            : products.filter(p => p.tag === selectedCategory);
    }, [products, selectedCategory]);

    // Add to Cart Handler
    const handleAddProduct = (product: Product) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });

        // Show Toast
        setToastMessage(`${product.name}이(가) 장바구니에 담겼습니다.`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-grid-bg-light dark:bg-background-dark shadow-2xl overflow-hidden border-x border-gray-100 dark:border-gray-800 font-display">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-grid-bg-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-200">
                <div className="flex items-center justify-between p-4 pb-2">
                    <Link href="/" className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-text-main" style={{ fontSize: "28px" }}>
                            arrow_back
                        </span>
                    </Link>
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold tracking-widest uppercase text-grid-primary mb-0.5">
                            BomNal
                        </span>
                        <h2 className="text-text-main text-xl font-extrabold leading-none tracking-tight">
                            봄날 스토어
                        </h2>
                    </div>
                    <Link href="/cart" className="relative flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-text-main" style={{ fontSize: "24px" }}>
                            shopping_bag
                        </span>
                        <CartBadge />
                    </Link>
                </div>

                <CategoryFilter
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 pb-24">
                <div className="mb-6 px-1">
                    <h1 className="text-2xl font-bold text-text-main dark:text-white mb-2">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.name} 추천 상품
                    </h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400 font-medium leading-relaxed">
                        어르신을 위한 꼼꼼한 선택,{" "}
                        <span className="text-grid-primary font-bold">
                            봄날이 보증합니다.
                        </span>
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={handleAddProduct}
                            />
                        ))}
                    </div>
                )}

                {filteredProducts.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">
                            inventory_2
                        </span>
                        <p className="text-gray-500">해당 카테고리에 상품이 없습니다.</p>
                    </div>
                )}
            </main>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {toastMessage}
                </div>
            )}

            <div className="h-safe-bottom bg-white dark:bg-gray-900"></div>
        </div>
    );
}
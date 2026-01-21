"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { CartBadge } from "@/components/layout/CartBadge";
import { useEffect, useState, useMemo } from "react";
import { getProducts, getCategories } from "@/lib/firebase/firestore";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { useFavoriteStore } from "@/store/favoriteStore";
import { ProductDetailModal } from "@/components/shop/ProductDetailModal";
import { useAuthContext } from "@/context/AuthContext";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    colorFrom: string;
    colorTo: string;
}

export default function Shop() {
    const addItem = useCartStore((state) => state.addItem);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(productsData as Product[]);

                // Sort categories if needed, or rely on default order
                setCategories(categoriesData as Category[]);
            } catch (error) {
                console.error("Failed to fetch shop data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const { isFavorite } = useFavoriteStore();
    const [searchQuery, setSearchQuery] = useState("");

    // Construct Display Categories for Filter
    const displayCategories = useMemo(() => [
        { id: 'all', name: '전체' },
        ...categories.map(c => ({ id: c.id, name: c.name })),
        { id: 'favorites', name: '찜한 상품' }
    ], [categories]);

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

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Category Filter
        if (selectedCategory === 'favorites') {
            filtered = filtered.filter(p => isFavorite(p.id));
        } else if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.tag === selectedCategory);
        }

        // Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [products, selectedCategory, searchQuery, isFavorite]);

    const CURRENT_CATEGORY_INFO = useMemo(() => {
        if (selectedCategory === 'favorites') return { desc: "나만을 위한 큐레이션, 위시리스트" };
        const cat = categories.find(c => c.id === selectedCategory);
        return cat ? { desc: cat.description } : { desc: "시니어를 위한 최고의 선택." };
    }, [categories, selectedCategory]);

    const isDashboard = selectedCategory === 'all' && !searchQuery;

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#f8f9fa] dark:bg-[#0a0a0a] font-display selection:bg-black selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 md:h-24 gap-4">
                        {/* Top: Brand & Back (Mobile) / Left (Desktop) */}
                        <div className="flex items-center justify-between w-full md:w-auto gap-4">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="flex items-center justify-center size-10 rounded-full bg-black text-white dark:bg-white dark:text-black transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_back</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">Premium Select</span>
                                    <span className="text-xl font-serif font-black text-gray-900 dark:text-white leading-none tracking-tight">BOMNAL</span>
                                </div>
                            </Link>

                            <Link href="/cart" className="md:hidden relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <span className="material-symbols-outlined text-gray-900 dark:text-white" style={{ fontSize: "26px" }}>shopping_bag</span>
                                <CartBadge />
                            </Link>
                        </div>

                        {/* Search Bar (Center/Full on Mobile) */}
                        <div className="flex-1 max-w-xl w-full mx-auto">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-xl">search</span>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-3 border-0 bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:bg-white dark:focus:bg-gray-800 shadow-inner rounded-full sm:text-sm transition-all duration-300"
                                    placeholder="검색어를 입력하세요"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Desktop Cart & spacing */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link href={useAuthContext().user ? "/orders" : "/login"} className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-symbols-outlined text-gray-900 dark:text-white group-hover:text-black transition-colors" style={{ fontSize: "28px" }}>{useAuthContext().user ? 'person' : 'login'}</span>
                            </Link>

                            <Link href="/cart" className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                                <span className="material-symbols-outlined text-gray-900 dark:text-white group-hover:text-black transition-colors" style={{ fontSize: "28px" }}>shopping_bag</span>
                                <CartBadge />
                            </Link>
                        </div>
                    </div>

                    {/* Category Filter (Always Visible) */}
                    <div className="pb-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-500 ease-out">
                        <CategoryFilter
                            categories={displayCategories}
                            selectedCategory={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                    </div>
                </div>
            </header>

            {/* Hero / Title Section */}
            <div className={`w-full transition-all duration-700 ${isDashboard ? 'bg-white dark:bg-black py-8' : 'bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
                    {isDashboard ? ( // Dashboard Title
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out text-center md:text-left">
                            <div className="inline-block px-3 py-1 mb-4 border border-black/10 dark:border-white/20 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">Dr. Jang's Collection</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
                                품격 있는 시니어 라이프,<br className="md:hidden" /> <span className="italic font-light">봄날</span>에서 시작하세요.
                            </h1>
                            <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                                소중한 분을 위한 프리미엄 케어 용품을 엄선하여 제안드립니다.
                            </p>
                        </div>
                    ) : ( // Category/Search Title
                        <div className="animate-in fade-in duration-700">
                            <h1 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-4 tracking-tight flex items-center gap-3">
                                {selectedCategory === 'favorites' && <span className="material-symbols-outlined text-red-600 fill-current" style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}>favorite</span>}
                                {displayCategories.find(c => c.id === selectedCategory)?.name || '검색 결과'}
                                {selectedCategory !== 'favorites' && selectedCategory !== 'all' && <span className="text-gray-300 font-light">Collection</span>}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl leading-relaxed pl-1">
                                {selectedCategory === 'favorites'
                                    ? "고객님의 취향이 담긴 특별한 위시리스트입니다."
                                    : searchQuery
                                        ? `"${searchQuery}"에 대한 프리미엄 검색 결과입니다.`
                                        : CURRENT_CATEGORY_INFO.desc
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-16">
                {loading ? (
                    <div className="flex justify-center py-40">
                        <div className="animate-spin rounded-full h-12 w-12 border border-gray-200 border-t-black dark:border-gray-800 dark:border-t-white"></div>
                    </div>
                ) : (
                    <>
                        {isDashboard ? (
                            // Category Dashboard Grid (Bento Style - Luxury Edition)
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700 pb-20">
                                {/* Map REAL categories first */}
                                {categories.map((cat, index) => {
                                    const productCount = products.filter(p => p.tag === cat.id).length;
                                    const isLarge = index === 0; // First one is large
                                    const colSpan = isLarge ? "md:col-span-2" : "md:col-span-1";
                                    const cardHeight = isLarge ? "h-[400px]" : "h-[280px]";

                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`relative ${cardHeight} ${colSpan} rounded-sm p-8 text-left transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.01] hover:shadow-2xl group overflow-hidden bg-gradient-to-br shadow-lg`}
                                            style={{
                                                backgroundImage: `linear-gradient(to bottom right, ${cat.colorFrom}, ${cat.colorTo})`,
                                                animationDelay: `${index * 150}ms`
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            <div className={`absolute -right-10 -bottom-10 opacity-20 group-hover:scale-105 group-hover:opacity-25 transition-all duration-1000 ease-out origin-bottom-right ${isLarge ? 'scale-110' : ''}`}>
                                                <span className="material-symbols-outlined text-[150px] md:text-[250px] text-white/50" style={{ fontWeight: 100 }}>
                                                    {cat.icon}
                                                </span>
                                            </div>

                                            <div className="relative z-10 h-full flex flex-col justify-between text-white">
                                                <div>
                                                    <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
                                                        <span className="font-serif text-2xl italic">0{index + 1}</span>
                                                        {productCount > 0 && (
                                                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase border border-white/20 rounded-full">
                                                                {productCount} Items
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h2 className="text-3xl md:text-4xl font-serif font-medium mb-3 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                                                        {cat.name}
                                                    </h2>
                                                    <p className={`text-white/80 font-light text-base leading-relaxed ${isLarge ? 'max-w-lg' : 'max-w-xs'}`}>
                                                        {cat.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold tracking-[0.2em] uppercase group-hover:underline underline-offset-4 decoration-white/50">View Collection</span>
                                                    <span className="material-symbols-outlined text-base group-hover:translate-x-2 transition-transform duration-500">arrow_right_alt</span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}

                                {/* Favorites Card (Static Custom Style) */}
                                <button
                                    onClick={() => setSelectedCategory('favorites')}
                                    className={`relative h-[280px] md:col-span-1 rounded-sm p-8 text-left transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.01] hover:shadow-2xl group overflow-hidden bg-gradient-to-br from-[#9f1239] to-[#be123c] shadow-lg`}
                                    style={{ animationDelay: `${categories.length * 150}ms` }}
                                >
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-105 group-hover:opacity-25 transition-all duration-1000 ease-out origin-bottom-right">
                                        <span className="material-symbols-outlined text-[150px] text-white/50" style={{ fontWeight: 100 }}>
                                            favorite
                                        </span>
                                    </div>
                                    <div className="relative z-10 h-full flex flex-col justify-between text-white">
                                        <div>
                                            <div className="flex items-center justify-between mb-8 border-b border-white/20 pb-6">
                                                <span className="font-serif text-2xl italic">0{categories.length + 1}</span>
                                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase border border-white/20 rounded-full">
                                                    {products.filter(p => isFavorite(p.id)).length} Items
                                                </span>
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4 tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-500">
                                                찜한 상품
                                            </h2>
                                            <p className="text-white/80 font-light text-lg leading-relaxed max-w-xs">
                                                나만을 위한 큐레이션, 위시리스트
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold tracking-[0.2em] uppercase group-hover:underline underline-offset-4 decoration-white/50">View Collection</span>
                                            <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform duration-500">arrow_right_alt</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            // Product Grid View
                            <>
                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                        {filteredProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onAdd={handleAddProduct}
                                                onClick={(p) => setSelectedProduct(p)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                                        <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                                            <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {selectedCategory === 'favorites' ? "찜한 상품이 없습니다" : "검색 결과가 없습니다"}
                                        </h3>
                                        <p className="text-gray-500 max-w-md mx-auto">
                                            {selectedCategory === 'favorites'
                                                ? "하트 버튼을 눌러 관심 있는 상품을 모아보세요."
                                                : "다른 검색어를 입력하거나 카테고리를 변경해보세요."}
                                        </p>
                                        {selectedCategory !== 'all' && (
                                            <button
                                                onClick={() => setSelectedCategory('all')}
                                                className="mt-6 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors text-primary"
                                            >
                                                전체 카테고리 보기
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </main>

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-white px-6 py-4 rounded-full shadow-2xl text-base font-bold z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 backdrop-blur-md border border-white/10 flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
                    {toastMessage}
                </div>
            )}

            <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-lg">medical_services</span>
                        </div>
                        <span className="text-lg font-bold text-gray-600 dark:text-gray-300">Senior Shop</span>
                    </div>
                    <div className="flex gap-4 mb-4 text-sm text-gray-500">
                        <Link href="/" className="hover:text-primary transition-colors">홈으로</Link>
                        <Link href="/cart" className="hover:text-primary transition-colors">장바구니</Link>
                        <button className="hover:text-primary transition-colors" onClick={() => alert('준비 중입니다.')}>고객센터</button>
                    </div>
                    <p className="text-sm text-gray-400 dark:text-gray-500 max-w-md">
                        &copy; {new Date().getFullYear()} Senior Shop. Dr. Jang's Orthopedic Solutions. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
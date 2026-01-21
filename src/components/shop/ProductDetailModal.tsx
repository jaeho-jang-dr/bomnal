"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { IconButton } from "../ui/IconButton";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
    options?: string[];
}

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const { items, addItem } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Mock options if none exist, just for demonstration based on user request
    const displayOptions = product?.options || (product?.tag === 'mobility' || product?.name.includes('매트') || product?.name.includes('보호대') ? ["기본형", "고급형 (+5,000원)", "맞춤형"] : []);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setQuantity(1);
            setSelectedOption(null);
        }
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    const handleAdd = () => {
        if (displayOptions.length > 0 && !selectedOption) {
            alert("옵션을 선택해주세요.");
            return;
        }

        // Mock price increase for options
        const finalPrice = selectedOption?.includes("+") ? product.price + 5000 : product.price;
        const productToAdd = { ...product, price: finalPrice };

        addItem(productToAdd, quantity, selectedOption || undefined);
        alert(product.name + " " + quantity + "개가 장바구니에 담겼습니다.");
        onClose();
    };

    const increaseQty = () => setQuantity(q => q + 1);
    const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px] animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 text-gray-800 dark:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>

                {/* Left: Image (Expanded) */}
                <div className="w-full md:w-1/2 relative bg-gray-100 dark:bg-gray-800 min-h-[300px] md:min-h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                    <div className="mb-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-2">
                            {product.tag || "Best Seller"}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                            {product.name}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400 text-lg">
                                <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                            </div>
                            <span className="text-sm text-gray-400 font-medium">(4.8)</span>
                        </div>
                    </div>

                    <div className="my-6 border-t border-b border-gray-100 dark:border-gray-800 py-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">상품 설명</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Options Selector */}
                        {displayOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">옵션 선택</h3>
                                <div className="flex flex-wrap gap-2">
                                    {displayOptions.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setSelectedOption(opt)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedOption === opt
                                                    ? "bg-primary text-white border-primary shadow-md"
                                                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary/50"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">수량</h3>
                            <div className="flex items-center gap-4">
                                <button onClick={decreaseQty} className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                                <button onClick={increaseQty} className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-end justify-between mb-6">
                            <span className="text-sm text-gray-500 font-medium">총 합계</span>
                            <div className="text-right">
                                <span className="text-4xl font-bold text-primary">
                                    ₩{((selectedOption?.includes("+") ? product.price + 5000 : product.price) * quantity).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-xl bg-gray-900 hover:bg-black text-white hover:scale-[1.02] active:scale-95 shadow-lg"
                        >
                            <span className="material-symbols-outlined text-2xl">add_shopping_cart</span>
                            장바구니 담기 ({quantity}개)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

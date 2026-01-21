"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore, CartItem as CartItemType } from "@/store/cartStore";
import { CartItem } from "@/components/cart/CartItem";
import { addOrder } from "@/lib/firebase/firestore";

type PaymentStep = 'none' | 'method_select' | 'address_input' | 'direct_options' | 'processing' | 'success';
type DirectMethod = 'card' | 'transfer' | 'simple' | null;

export default function CartPage() {
    const { items, totalPrice, removeItems } = useCartStore();
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

    // Payment State
    // Payment State
    const [paymentStep, setPaymentStep] = useState<PaymentStep>('none');
    const [directMethod, setDirectMethod] = useState<DirectMethod>(null);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        phone: '',
        address: '',
        detailAddress: ''
    });

    // Derived state for compatibility (if needed) or refactor usage
    const isSuccess = paymentStep === 'success';

    // Helper to generate unique key for selection
    const generateItemKey = (item: CartItemType) => `${item.id}-${item.selectedOption || "default"}`;

    // Auto-select all items initially
    useEffect(() => {
        if (items.length > 0 && selectedItems.size === 0 && !isSuccess) {
            setSelectedItems(new Set(items.map(generateItemKey)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length]);

    const toggleSelect = (key: string) => {
        const newSet = new Set(selectedItems);
        if (newSet.has(key)) newSet.delete(key);
        else newSet.add(key);
        setSelectedItems(newSet);
    };

    const toggleSelectAll = () => {
        if (selectedItems.size === items.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(items.map(generateItemKey)));
        }
    };

    const selectedTotal = items
        .filter(item => selectedItems.has(generateItemKey(item)))
        .reduce((total, item) => total + item.price * item.quantity, 0);

    const startCheckout = () => {
        if (selectedItems.size === 0) {
            alert("선택된 상품이 없습니다.");
            return;
        }
        setPaymentStep('method_select');
    };

    const handleInitialMethodSelect = (method: 'naver' | 'direct') => {
        if (method === 'naver') {
            const confirmNav = confirm("네이버 스마트스토어 페이지로 이동하시겠습니까?");
            if (confirmNav) {
                window.open('https://smartstore.naver.com/', '_blank');
            }
        } else {
            setPaymentStep('address_input');
        }
    };

    const resetPayment = () => {
        setPaymentStep('none');
        setDirectMethod(null);
    };

    const handleAddressSubmit = () => {
        if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
            alert("필수 배송 정보를 모두 입력해주세요.");
            return;
        }
        setPaymentStep('direct_options');
    };

    const handleDirectPayment = async () => {
        const checkoutItems = items.filter(item => selectedItems.has(generateItemKey(item)));

        if (checkoutItems.length === 0) return;

        setPaymentStep('processing');
        try {
            // Save Order to Firestore
            const orderId = await addOrder({
                items: checkoutItems,
                totalAmount: selectedTotal,
                shippingInfo,
                paymentMethod: directMethod,
                userId: 'guest',
                createdAt: new Date()
            });

            if (!orderId) throw new Error("Order creation failed");

            // Simulate API processing delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Remove purchased items
            removeItems(checkoutItems.map(item => ({
                id: item.id,
                selectedOption: item.selectedOption
            })));

            setPaymentStep('success');
            setSelectedItems(new Set());
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("결제 처리 중 오류가 발생했습니다.");
            setPaymentStep('direct_options');
        }
    };

    // Empty Cart View
    if (items.length === 0 && !isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center font-display animate-in fade-in zoom-in-95 duration-500">
                <div className="size-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-gray-400">shopping_cart_off</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">장바구니가 비어있습니다</h2>
                <p className="text-gray-500 mb-8 text-lg">새로운 상품을 둘러보고 담아보세요.</p>
                <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
                    쇼핑하러 가기
                </Link>
            </div>
        );
    }

    // Success View
    if (paymentStep === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center font-display animate-in slide-in-from-bottom-10 fade-in duration-700">
                <div className="size-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
                    <span className="material-symbols-outlined text-6xl text-green-600 dark:text-green-400">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">결제가 완료되었습니다!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">주문하신 상품이 준비되는 대로 배송됩니다.</p>
                <p className="text-gray-500 mb-10 text-sm">주문번호: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <div className="flex gap-4 w-full max-w-sm">
                    <Link href="/shop" className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors text-center">
                        쇼핑 계속하기
                    </Link>
                    <Link href="/orders" className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all text-center">
                        주문 내역 보기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl min-h-screen pb-40 font-display relative">
            <header className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-10 pt-2 transition-all">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    장바구니
                    <span className="bg-primary/10 text-primary text-sm px-2.5 py-0.5 rounded-full font-extrabold">{items.length}</span>
                </h1>
                {items.length > 0 && (
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-primary transition-colors select-none">
                        <input
                            type="checkbox"
                            checked={selectedItems.size === items.length}
                            onChange={toggleSelectAll}
                            className="rounded border-gray-300 text-primary focus:ring-primary size-5"
                        />
                        전체 선택
                    </label>
                )}
            </header>

            <ul className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {items.map((item) => {
                    const key = generateItemKey(item);
                    return (
                        <CartItem
                            key={key}
                            item={item}
                            isSelected={selectedItems.has(key)}
                            onToggleSelect={() => toggleSelect(key)}
                        />
                    );
                })}
            </ul>

            <div className="mt-8 mb-24 px-4">
                <Link
                    href="/shop"
                    className="flex items-center justify-center w-full py-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-bold text-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                >
                    <span className="material-symbols-outlined mr-2">arrow_back</span>
                    계속 쇼핑하기
                </Link>
            </div>

            {/* Bottom Fixed Bar */}
            <div className={`fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-[100] safe-bottom pb-8 md:pb-6 transition-transform duration-300 ${paymentStep !== 'none' ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="max-w-2xl mx-auto flex flex-col gap-4">
                    <div className="flex justify-between items-end text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-lg">총 결제금액 <span className="text-gray-400 text-sm">({selectedItems.size}개)</span></span>
                        <div className="text-right leading-none">
                            {selectedItems.size < items.length && (
                                <div className="text-sm text-gray-400 line-through mb-1">₩{totalPrice().toLocaleString()}</div>
                            )}
                            <span className="block text-3xl font-extrabold text-primary tracking-tight">
                                ₩{selectedTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={startCheckout}
                        disabled={selectedItems.size === 0}
                        className={`w-full relative overflow-hidden bg-primary text-white text-center py-4 rounded-xl font-bold text-xl transition-all shadow-xl shadow-primary/30 
                            ${selectedItems.size === 0
                                ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 shadow-none'
                                : 'hover:bg-primary-dark hover:scale-[1.01] active:scale-95'
                            }
                        `}
                    >
                        <span>{selectedItems.size > 0 ? '구매하기' : '상품을 선택해주세요'}</span>
                    </button>
                </div>
            </div>

            {/* Payment Modal Overlay */}
            {paymentStep !== 'none' && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={resetPayment}></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-10 sm:pb-6 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {paymentStep === 'method_select' ? '구매 방식 선택' :
                                    paymentStep === 'address_input' ? '배송지 정보 입력' :
                                        paymentStep === 'direct_options' ? '결제 수단 선택' : '결제 진행 중'}
                            </h2>
                            {paymentStep !== 'processing' && (
                                <button onClick={resetPayment} className="p-2 -mr-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            )}
                        </div>

                        {/* Step 1: Method Selection */}
                        {paymentStep === 'method_select' && (
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleInitialMethodSelect('naver')}
                                    className="w-full flex items-center p-5 rounded-2xl border-2 border-[#03C75A] bg-[#03C75A]/5 hover:bg-[#03C75A]/10 transition-colors group text-left"
                                >
                                    <div className="size-12 rounded-full bg-[#03C75A] text-white flex items-center justify-center shrink-0 mr-4 shadow-md group-hover:scale-110 transition-transform">
                                        <span className="font-black text-xl">N</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">네이버 스마트스토어 구매</h3>
                                        <p className="text-sm text-gray-500">네이버페이 포인트 혜택을 받고 싶다면?</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-gray-400">chevron_right</span>
                                </button>

                                <button
                                    onClick={() => handleInitialMethodSelect('direct')}
                                    className="w-full flex items-center p-5 rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors group text-left"
                                >
                                    <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mr-4 shadow-md group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">보무날에서 바로 결제</h3>
                                        <p className="text-sm text-gray-500">쉽고 빠른 간편결제를 원하신다면?</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-gray-400">chevron_right</span>
                                </button>
                            </div>
                        )}

                        {/* Step 2: Address Input */}
                        {paymentStep === 'address_input' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">받는 분 성함</label>
                                    <input
                                        type="text"
                                        value={shippingInfo.name}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary"
                                        placeholder="홍길동"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">연락처</label>
                                    <input
                                        type="tel"
                                        value={shippingInfo.phone}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary"
                                        placeholder="010-0000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">주소</label>
                                    <input
                                        type="text"
                                        value={shippingInfo.address}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary mb-2"
                                        placeholder="서울시 강남구 ..."
                                    />
                                    <input
                                        type="text"
                                        value={shippingInfo.detailAddress}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, detailAddress: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary"
                                        placeholder="상세 주소 (선택)"
                                    />
                                </div>
                                <button
                                    onClick={handleAddressSubmit}
                                    className="w-full py-4 mt-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all"
                                >
                                    결제 수단 선택하기
                                </button>
                                <button onClick={() => setPaymentStep('method_select')} className="w-full py-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium">
                                    뒤로 가기
                                </button>
                            </div>
                        )}

                        {/* Step 3: Direct Payment Options */}
                        {paymentStep === 'direct_options' && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${directMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} `}>
                                        <input type="radio" name="pay" className="sr-only" checked={directMethod === 'card'} onChange={() => setDirectMethod('card')} />
                                        <span className="material-symbols-outlined text-2xl mr-3 text-gray-600">credit_card</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200">신용/체크카드</span>
                                        {directMethod === 'card' && <span className="material-symbols-outlined ml-auto text-primary">check_circle</span>}
                                    </label>

                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${directMethod === 'transfer' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} `}>
                                        <input type="radio" name="pay" className="sr-only" checked={directMethod === 'transfer'} onChange={() => setDirectMethod('transfer')} />
                                        <span className="material-symbols-outlined text-2xl mr-3 text-gray-600">account_balance</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200">실시간 계좌이체</span>
                                        {directMethod === 'transfer' && <span className="material-symbols-outlined ml-auto text-primary">check_circle</span>}
                                    </label>

                                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${directMethod === 'simple' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'} `}>
                                        <input type="radio" name="pay" className="sr-only" checked={directMethod === 'simple'} onChange={() => setDirectMethod('simple')} />
                                        <span className="material-symbols-outlined text-2xl mr-3 text-yellow-500">payments</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200">간편결제 (네이버/카카오페이)</span>
                                        {directMethod === 'simple' && <span className="material-symbols-outlined ml-auto text-primary">check_circle</span>}
                                    </label>
                                </div>

                                <button
                                    onClick={handleDirectPayment}
                                    disabled={!directMethod}
                                    className={`w-full py-4 rounded-xl font-bold text-xl text-white transition-all shadow-lg ${!directMethod ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark shadow-primary/30'} `}
                                >
                                    {selectedTotal.toLocaleString()}원 결제하기
                                </button>

                                <div className="text-center">
                                    <button onClick={() => setPaymentStep('address_input')} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-sm font-medium underline-offset-4 hover:underline">
                                        이전으로 돌아가기
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Processing */}
                        {paymentStep === 'processing' && (
                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                <span className="size-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-6"></span>
                                <h3 className="text-xl font-bold mb-2">결제가 진행 중입니다</h3>
                                <p className="text-gray-500">잠시만 기다려주세요...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

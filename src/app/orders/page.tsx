"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "@/lib/firebase/firestore";

interface OrderItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Order {
    id: string;
    totalAmount: number;
    createdAt: any; // Firestore Timestamp
    status: string;
    items: any[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders();
            // In a real app, we would filter by userId here
            // For now, we show all orders as a demo
            setOrders(data as Order[]);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] font-display">
                <div className="size-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl min-h-screen pb-20 font-display">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/shop" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </Link>
                <h1 className="text-2xl font-bold">주문 내역</h1>
            </header>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">list_alt</span>
                    <p className="text-xl text-gray-500 mb-6">주문 내역이 없습니다.</p>
                    <Link href="/shop" className="bg-primary text-white px-6 py-3 rounded-xl font-bold">
                        쇼핑하러 가기
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const date = order.createdAt?.seconds
                            ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                            : '날짜 정보 없음';

                        return (
                            <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-lg border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 mb-2">
                                            {order.status === 'pending' ? '결제완료' : order.status}
                                        </span>
                                        <div className="text-sm text-gray-500">{date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">₩{order.totalAmount.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400 font-mono">#{order.id.slice(0, 8)}</div>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {order.items.map((item: any, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            {item.image && (
                                                <img src={item.image} alt={item.name} className="size-12 rounded-lg object-cover bg-gray-100" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate text-gray-900 dark:text-gray-100">{item.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {item.selectedOption && <span className="mr-2 text-primary">[{item.selectedOption}]</span>}
                                                    {item.quantity}개
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getOrders } from "@/lib/firebase/firestore";

interface Order {
    id: string;
    totalAmount: number;
    createdAt: any; // Firestore Timestamp
    status: string;
    items: any[];
    shippingInfo?: {
        name: string;
        phone: string;
        address: string;
        detailAddress: string;
        memo?: string;
    };
    paymentMethod?: string;
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

    const handlePrintReceiver = (order: Order) => {
        const date = order.createdAt?.seconds
            ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
            : '날짜 정보 없음';

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>주문 영수증 - ${order.id}</title>
                    <style>
                        body { font-family: sans-serif; padding: 40px; }
                        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                        .section { margin-bottom: 30px; }
                        h1 { margin: 0 0 10px 0; }
                        h3 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
                        .grid { display: grid; grid-template-columns: 100px 1fr; gap: 10px; margin-bottom: 10px; }
                        .label { font-weight: bold; color: #666; }
                        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                        .table th { background-color: #f5f5f5; }
                        .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; }
                        @media print {
                            body { -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>영 수 증</h1>
                        <p>주문번호: ${order.id}</p>
                        <p>발행일: ${date}</p>
                    </div>

                    <div class="section">
                        <h3>배송 정보</h3>
                        <div class="grid">
                            <div class="label">받는 분</div>
                            <div>${order.shippingInfo?.name || '-'}</div>
                            <div class="label">연락처</div>
                            <div>${order.shippingInfo?.phone || '-'}</div>
                            <div class="label">주소</div>
                            <div>${order.shippingInfo?.address || ''} ${order.shippingInfo?.detailAddress || ''}</div>
                        </div>
                    </div>

                    <div class="section">
                        <h3>주문 상품</h3>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td>${item.name} ${item.selectedOption ? `[${item.selectedOption}]` : ''}</td>
                                        <td>${item.quantity}</td>
                                        <td>₩${(item.price * item.quantity).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="total">
                            총 결제금액: ₩${order.totalAmount.toLocaleString()}
                        </div>
                    </div>

                    <div class="section">
                        <h3>결제 정보</h3>
                        <div class="grid">
                            <div class="label">결제수단</div>
                            <div>${order.paymentMethod === 'direct_bank_transfer' ? '무통장 입금' : order.paymentMethod || '기타'}</div>
                            <div class="label">결제상태</div>
                            <div>${order.status}</div>
                        </div>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] font-display">
                <div className="size-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-3xl min-h-screen pb-20 font-display">
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
                <div className="space-y-8">
                    {orders.map((order) => {
                        const date = order.createdAt?.seconds
                            ? new Date(order.createdAt.seconds * 1000)
                            : new Date();

                        const dateString = date.toLocaleDateString();

                        // Calculate estimated delivery (Order Date + 3 days)
                        const estimatedDate = new Date(date);
                        estimatedDate.setDate(date.getDate() + 3);
                        const estimatedDateString = estimatedDate.toLocaleDateString();

                        return (
                            <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                                {/* Order Header */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 flex flex-wrap justify-between items-center border-b border-gray-100 dark:border-gray-700 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <span className="material-symbols-outlined text-primary">local_shipping</span>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium">주문일자</div>
                                            <div className="font-bold text-gray-900 dark:text-gray-100">{dateString}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePrintReceiver(order)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">print</span>
                                            영수증 출력
                                        </button>
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-5">
                                    {/* Status & ID */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' :
                                                    order.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                                }`}>
                                                {order.status === 'pending' ? '결제대기/완료' : order.status}
                                            </span>
                                            <h3 className="mt-1 text-lg font-bold">
                                                주문번호 <span className="text-gray-400 font-mono text-base">#{order.id.slice(0, 8)}</span>
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-primary">₩{order.totalAmount.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mb-6 space-y-4">
                                        {order.items.map((item: any, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
                                                {item.image && (
                                                    <div className="relative size-16 flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="rounded-lg object-cover bg-gray-100"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-gray-900 dark:text-gray-100 truncate">{item.name}</div>
                                                    <div className="text-sm text-gray-500 mt-0.5">
                                                        {item.selectedOption && <span className="mr-2 text-primary">[{item.selectedOption}]</span>}
                                                        {item.quantity}개
                                                    </div>
                                                </div>
                                                <div className="font-bold text-sm">
                                                    ₩{(item.price * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm">
                                        {/* Shipping Info */}
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">local_shipping</span>
                                                배송 정보
                                            </h4>
                                            <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                                <div className="flex justify-between">
                                                    <span>받는 분:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-200">{order.shippingInfo?.name || '정보 없음'}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>연락처:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-200">{order.shippingInfo?.phone || '정보 없음'}</span>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="text-xs text-gray-500 mb-0.5">배송지</div>
                                                    <div className="font-medium text-gray-900 dark:text-gray-200 leading-snug">
                                                        {order.shippingInfo ? `${order.shippingInfo.address} ${order.shippingInfo.detailAddress}` : '주소 정보 없음'}
                                                    </div>
                                                </div>
                                                <div className="pt-2 text-primary font-bold flex justify-between items-center">
                                                    <span>도착 예정일:</span>
                                                    <span>{estimatedDateString} (예정)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="space-y-3 md:border-l md:pl-6 border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">credit_card</span>
                                                결제 정보
                                            </h4>
                                            <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                                <div className="flex justify-between">
                                                    <span>결제 방법:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-200">
                                                        {order.paymentMethod === 'direct_bank_transfer' ? '무통장 입금' : order.paymentMethod || '기타'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>결제 일시:</span>
                                                    <span className="font-medium text-gray-900 dark:text-gray-200">{dateString}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                    <span className="font-bold">총 결제금액</span>
                                                    <span className="text-lg font-black text-primary">₩{order.totalAmount.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

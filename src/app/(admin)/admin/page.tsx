"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import KPICards from "@/components/admin/dashboard/KPICards";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import { ArrowRight, Package, User } from "lucide-react";

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
                    <p className="text-gray-600 mt-1">오늘도 좋은 하루 되세요, {user?.email?.split('@')[0]}님 👋</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/seed" className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">
                        DB 초기화 (Dev)
                    </Link>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                        리포트 다운로드
                    </button>
                </div>
            </div>

            {/* 1. Key Metrics */}
            <KPICards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* 2. Sales Chart (Takes up 2/3 space) */}
                <div className="lg:col-span-2">
                    <SalesChart />
                </div>

                {/* 3. Recent Activity (Takes up 1/3 space) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">최근 활동</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className={`p-2 rounded-lg ${item % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                    {item % 2 === 0 ? <User size={18} /> : <Package size={18} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {item % 2 === 0 ? '신규 회원 가입' : '새로운 주문 접수'}
                                    </p>
                                    <p className="text-xs text-gray-500">2분 전</p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                        모든 활동 보기
                    </button>
                </div>
            </div>

            {/* 4. Quick Actions Grid */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 바로가기</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Products Card */}
                <Link href="/admin/products" className="group">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-500/50 transition-all h-full">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">inventory_2</span>
                            <h3 className="font-bold text-gray-900">상품 관리</h3>
                        </div>
                        <p className="text-sm text-gray-500">상품 등록 및 수정</p>
                    </div>
                </Link>

                {/* Orders Card */}
                <Link href="/admin/orders" className="group">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-500/50 transition-all h-full">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-green-600 bg-green-50 p-2 rounded-lg">shopping_cart</span>
                            <h3 className="font-bold text-gray-900">주문 관리</h3>
                        </div>
                        <p className="text-sm text-gray-500">배송 및 주문 현황</p>
                    </div>
                </Link>

                {/* Users Card */}
                <Link href="/admin/users" className="group">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-500/50 transition-all h-full">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-purple-600 bg-purple-50 p-2 rounded-lg">group</span>
                            <h3 className="font-bold text-gray-900">사용자 관리</h3>
                        </div>
                        <p className="text-sm text-gray-500">회원 및 권한 관리</p>
                    </div>
                </Link>

                {/* Settings Card */}
                <Link href="/admin/settings" className="group">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-500/50 transition-all h-full">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-gray-600 bg-gray-50 p-2 rounded-lg">settings</span>
                            <h3 className="font-bold text-gray-900">설정</h3>
                        </div>
                        <p className="text-sm text-gray-500">사이트 환경설정</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

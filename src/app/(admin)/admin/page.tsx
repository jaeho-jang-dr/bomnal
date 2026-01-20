"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
                <p className="text-gray-600 mt-2">환영합니다, {user?.email}님</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Products Card */}
                <Link href="/admin/products" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all group-hover:shadow-md group-hover:border-primary/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">inventory_2</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">상품 관리</h3>
                                <p className="text-sm text-gray-500">카탈로그 관리</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            상품을 추가, 수정, 삭제합니다. 가격, 이미지, 설명을 업데이트합니다.
                        </p>
                    </div>
                </Link>

                {/* Users Card */}
                <Link href="/admin/users" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all group-hover:shadow-md group-hover:border-primary/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">group</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">사용자 관리</h3>
                                <p className="text-sm text-gray-500">접근 권한 관리</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            가입된 사용자를 조회하고 역할(관리자/사용자)을 관리합니다.
                        </p>
                    </div>
                </Link>

                {/* Orders Card */}
                <Link href="/admin/orders" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all group-hover:shadow-md group-hover:border-primary/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">주문 관리</h3>
                                <p className="text-sm text-gray-500">거래 내역 조회</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            고객 주문을 추적하고 배송 상태를 업데이트합니다.
                        </p>
                    </div>
                </Link>

                {/* Settings Card */}
                <Link href="/admin/settings" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all group-hover:shadow-md group-hover:border-primary/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-gray-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">settings</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">설정</h3>
                                <p className="text-sm text-gray-500">시스템 구성</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            웹사이트 설정, SEO 기본값 및 기타 구성을 관리합니다.
                        </p>
                    </div>
                </Link>

                {/* Database Seed Card (Dev Only) */}
                <Link href="/seed" className="group">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200 transition-all group-hover:shadow-md group-hover:border-orange-500/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">database</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">DB 초기화 (Seed)</h3>
                                <p className="text-sm text-gray-500">데이터 리셋</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            (개발용) 초기 상품 데이터를 Firestore에 주입하고 리셋합니다.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

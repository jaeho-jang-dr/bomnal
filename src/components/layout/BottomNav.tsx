"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useUIStore } from "@/store/uiStore";
import { signOutUser } from "@/lib/firebase/auth"; // Correct import path based on page.tsx
import { useState } from "react";
import { CartBadge } from "@/components/layout/CartBadge";

export const BottomNav = () => {
    const pathname = usePathname();
    const { user, loading } = useAuthContext();
    const openAuthModal = useUIStore((state) => state.openAuthModal);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleProfileClick = () => {
        if (loading) return;
        if (user) {
            // Show logout confirmation instead of immediate logout
            setShowLogoutConfirm(true);
        } else {
            openAuthModal();
        }
    };

    const handleLogout = async () => {
        await signOutUser();
        setShowLogoutConfirm(false);
    };

    // Helper to determine if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Logout Confirmation Modal/Guide */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowLogoutConfirm(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl max-w-xs w-full animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">로그아웃 하시겠습니까?</h3>
                        <p className="text-sm text-gray-500 mb-6">계정에서 로그아웃됩니다.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 safe-bottom pt-2 px-2 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-around pb-2">
                    {/* Home Button - Works from anywhere */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center gap-1 p-2 transition-colors cursor-pointer ${isActive("/") ? "text-primary" : "text-text-muted hover:text-primary"
                            }`}
                    >
                        <span
                            className={`material-symbols-outlined ${isActive("/") ? "filled material-symbols-filled" : ""}`}
                        >
                            home
                        </span>
                        <span className="text-[10px] font-bold">홈</span>
                    </Link>

                    {/* Shop Button */}
                    <Link
                        href="/shop"
                        className={`flex flex-col items-center gap-1 p-2 transition-colors cursor-pointer ${isActive("/shop") ? "text-primary" : "text-text-muted hover:text-primary"
                            }`}
                    >
                        <span className="material-symbols-outlined">grid_view</span>
                        <span className="text-[10px] font-medium">쇼핑</span>
                    </Link>

                    {/* Cart Button */}
                    <Link
                        href="/cart"
                        className={`relative flex flex-col items-center gap-1 p-2 transition-colors cursor-pointer ${isActive("/cart") ? "text-primary" : "text-text-muted hover:text-primary"
                            }`}
                    >
                        <div className="relative">
                            <span className={`material-symbols-outlined ${isActive("/cart") ? "filled material-symbols-filled" : ""}`}
                            >
                                shopping_cart
                            </span>
                            {/* Cart Badge */}
                            <CartBadge />
                        </div>
                        <span className="text-[10px] font-medium">장바구니</span>
                    </Link>

                    {/* Profile Button */}
                    <button
                        onClick={handleProfileClick}
                        className={`flex flex-col items-center gap-1 p-2 transition-colors cursor-pointer ${isActive("/profile") ? "text-primary" : "text-text-muted hover:text-primary"
                            }`}
                        disabled={loading}
                    >
                        <span className="material-symbols-outlined">
                            {user ? "face" : "person"}
                        </span>
                        <span className="text-[10px] font-medium max-w-[100px] truncate leading-tight">
                            {loading ? "..." : user ? (user.displayName || user.email?.split("@")[0] || "내 정보") : "프로필"}
                        </span>
                    </button>

                    {/* Admin/Unicorn Button - Right side of Profile */}
                    {(user?.role === 'admin' || user?.email === 'drjang00@gmail.com') && (
                        <Link
                            href="/admin"
                            className={`flex flex-col items-center gap-1 p-2 transition-colors cursor-pointer ${isActive("/admin") ? "text-primary" : "text-text-muted hover:text-primary"
                                }`}
                        >
                            {/* Unicorn Emoji as requested */}
                            <span className="text-2xl leading-none pt-0.5">🦄</span>
                            <span className="text-[10px] font-medium">관리자</span>
                        </Link>
                    )}
                </div>
            </nav>
            {/* Safe area spacing for phones with home indicators */}
            <div className="h-[72px] w-full"></div>
        </>
    );
};

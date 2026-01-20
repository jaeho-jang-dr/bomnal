"use client";

import { useState, useEffect } from "react";
import { seedProducts } from "@/lib/firebase/seed";
import { useAuth } from "@/hooks/useAuth";
import { updateUserRole } from "@/lib/firebase/auth";
import { AuthModal } from "@/components/auth/AuthModal";

export default function SeedPage() {
    const [status, setStatus] = useState("대기 중");
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user, loading } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const runSeed = async () => {
        setStatus("데이터 주입 중...");
        const result = await seedProducts();
        setStatus(`완료: ${result}`);
    };

    const makeMeAdmin = async () => {
        if (!user) {
            setStatus("오류: 먼저 로그인해야 합니다!");
            return;
        }
        setStatus("사용자 권한 업그레이드 중...");
        await updateUserRole(user.uid, "admin");
        setStatus("성공! 이제 관리자입니다. 변경 사항을 확인하려면 페이지를 새로고침하세요.");
    };

    if (!mounted) return null;

    return (
        <div className="p-10">
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}

            <h1 className="text-2xl font-bold mb-4">개발자 도구</h1>

            {/* Config Debug Info */}
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm font-mono">
                <p><strong>설정 확인:</strong></p>
                <p>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "로드됨 ✅" : "없음 ❌"}</p>
                <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "로드됨 ✅" : "없음 ❌"}</p>
                <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "로드됨 ✅" : "없음 ❌"}</p>
            </div>

            <div className="flex flex-col gap-4 max-w-sm">
                <div className="border p-4 rounded bg-gray-50">
                    <h2 className="font-bold mb-2">1. 데이터베이스 시더</h2>
                    <button
                        onClick={runSeed}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                    >
                        상품 데이터 주입
                    </button>
                </div>

                <div className="border p-4 rounded bg-gray-50">
                    <h2 className="font-bold mb-2">2. 관리자 권한</h2>
                    <div className="mb-2">
                        {loading ? (
                            <p className="text-sm text-gray-400">사용자 확인 중...</p>
                        ) : user ? (
                            <p className="text-sm text-green-600 font-bold">로그인됨: {user.email}</p>
                        ) : (
                            <p className="text-sm text-red-500 font-bold">로그인되지 않음</p>
                        )}
                    </div>

                    {!user && !loading && (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="px-4 py-2 mb-2 bg-gray-800 text-white rounded hover:bg-gray-700 w-full"
                        >
                            먼저 로그인하기
                        </button>
                    )}

                    <button
                        onClick={makeMeAdmin}
                        disabled={!user}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        관리자 권한 받기
                    </button>
                </div>
            </div>

            <p className="mt-6 font-mono bg-black text-white p-4 rounded">{status}</p>
        </div>
    );
}

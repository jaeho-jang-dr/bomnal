"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/shop'); // Redirect to shop after login
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('너무 많은 로그인 시도가 감지되었습니다. 잠시 후 다시 시도해주세요.');
            } else {
                setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-950 rounded-3xl shadow-xl p-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block text-3xl font-black text-primary mb-2">BOMNAL</Link>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">로그인</h2>
                    <p className="text-gray-500 mt-2">서비스 이용을 위해 로그인해주세요.</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium flex items-center animate-in slide-in-from-top-2">
                        <span className="material-symbols-outlined mr-2 text-lg">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            placeholder="비밀번호 입력"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : '로그인하기'}
                    </button>
                </form>

                <div className="my-8 flex items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">또는 간편 로그인</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={async () => {
                            const { signInWithGoogle } = await import('@/lib/firebase/auth');
                            const result = await signInWithGoogle();
                            if (result.user) router.push('/shop');
                        }}
                        className="w-full bg-white text-gray-700 border border-gray-200 py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span className="font-bold text-blue-500 text-xl">G</span> 구글로 시작하기
                    </button>

                    <button
                        type="button"
                        onClick={async () => {
                            const { signInWithNaver } = await import('@/lib/firebase/auth');
                            const user = await signInWithNaver();
                            if (user) router.push('/shop');
                        }}
                        className="w-full bg-[#03C75A] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#02b351] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span className="font-black text-xl">N</span> 네이버로 시작하기
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            const { signInWithKakao } = await import('@/lib/firebase/auth');
                            const user = await signInWithKakao();
                            if (user) router.push('/shop');
                        }}
                        className="w-full bg-[#FEE500] text-[#391B1B] py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#fdd835] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span className="font-black text-xl">K</span> 카카오톡으로 시작하기
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        아직 계정이 없으신가요?{' '}
                        <Link href="/signup" className="text-primary font-bold hover:underline">
                            회원가입
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

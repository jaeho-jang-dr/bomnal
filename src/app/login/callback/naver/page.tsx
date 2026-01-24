'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function NaverLoginContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (code) {
            // 부모 창으로 성공 메시지 전송
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'NAVER_LOGIN_SUCCESS', code, state },
                    window.location.origin
                );
            }
        } else if (error) {
            // 부모 창으로 실패 메시지 전송
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'NAVER_LOGIN_FAILURE', error },
                    window.location.origin
                );
            }
        }
    }, [searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-bold mb-4">로그인 처리 중...</h2>
                <p>잠시만 기다려주세요.</p>
            </div>
        </div>
    );
}

export default function NaverLoginCallback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NaverLoginContent />
        </Suspense>
    );
}

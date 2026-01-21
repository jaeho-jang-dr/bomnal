"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function LoginCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState("로그인 처리 중입니다...");

    useEffect(() => {
        const processLogin = async () => {
            const code = searchParams.get("code");
            const state = searchParams.get("state");

            if (!code) {
                setStatus("인증 코드가 없습니다. 다시 시도해주세요.");
                return;
            }

            try {
                // Exchange code for custom token via our API
                const response = await fetch("/api/auth/naver", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code, state }),
                });

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.token) {
                    // Sign in with the custom token
                    await signInWithCustomToken(auth, data.token);
                    setStatus("로그인 성공! 이동 중...");

                    // Close popup if opened in popup
                    if (window.opener) {
                        window.opener.postMessage({ type: "NAVER_LOGIN_SUCCESS" }, "*");
                        window.close();
                    } else {
                        // Or redirect if not in popup
                        router.push("/");
                    }
                }
            } catch (error: any) {
                console.error("Login failed:", error);
                setStatus(`로그인 실패: ${error.message}`);
            }
        };

        processLogin();
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">네이버 로그인</h2>
                <p className="text-gray-600">{status}</p>
                <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
            </div>
        </div>
    );
}

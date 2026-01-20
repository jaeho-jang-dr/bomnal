"use client";

import React from "react";
import Image from "next/image";

export const DirectorTrust = () => {
    return (
        <section className="mx-4 my-6 rounded-3xl bg-secondary dark:bg-gray-800 p-6 shadow-sm overflow-hidden relative">
            {/* Abstract Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 dark:bg-white/5 rounded-full blur-2xl"></div>
            <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative mb-4">
                    <div className="relative size-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md overflow-hidden bg-gray-200">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcTC8ERDW2HQcl43sneWtwqWsiFtSzRIIHL2PjyRy4hHTX6yh1YgLlTr0_VpOiBLsUnMYNRozaiqv1DRf7PWQBTeW3lFOUh7c3g8q-xFM6Q6u-MKdw8AHYn8Q7INPsXz3BsfKwVJyT_L94I6Yf0PW9zc1nM_uvDSyzO3-PcQH63q2JNGI3pKBhLyDaJ_7pNeBo6VcK2AzpdC2hqCL_ARRknAMBH9MKslc9fR6sUndWtwdPfFIQFKkmwVQB-tAa0hn2I1lhAS3T62k"
                            alt="Dr. Smith looking reassuringly at the camera"
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-secondary dark:border-gray-800 z-20">
                        <span className="material-symbols-outlined text-sm block">
                            verified
                        </span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">
                    닥터 스미스의 한마디
                </h3>
                <p className="text-text-main/80 dark:text-gray-300 text-base font-medium leading-relaxed mb-4 italic">
                    &quot;판매하는 모든 보호대와 지지대는 제가 직접 검증합니다. 제 가족에게 처방할 수 없는 제품이라면, 이곳에서 판매하지 않습니다.&quot;
                </p>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl text-primary signature-text opacity-90">
                        Dr. Sarah Smith
                    </span>
                    <p className="text-xs uppercase tracking-widest font-bold text-text-muted">
                        대표 원장 & 수석 외과 전문의
                    </p>
                </div>
            </div>
        </section>
    );
};

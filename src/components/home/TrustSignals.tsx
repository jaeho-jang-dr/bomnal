"use client";

import React from "react";

export const TrustSignals = () => {
    return (
        <section className="px-6 py-8 mt-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        local_shipping
                    </span>
                    <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                        간편<br />
                        반품
                    </p>
                </div>
                <div className="w-px bg-gray-100 dark:bg-gray-800 h-12 self-center"></div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        verified_user
                    </span>
                    <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                        의료기기<br />
                        인증
                    </p>
                </div>
                <div className="w-px bg-gray-100 dark:bg-gray-800 h-12 self-center"></div>
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">
                        medical_information
                    </span>
                    <p className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                        전문의<br />
                        검증
                    </p>
                </div>
            </div>
        </section>
    );
};

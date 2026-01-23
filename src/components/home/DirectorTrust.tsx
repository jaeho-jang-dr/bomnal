"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebase/config";
import { DEFAULT_SETTINGS, SiteSettings } from "@/types/settings";

export const DirectorTrust = () => {
    const [banner, setBanner] = useState(DEFAULT_SETTINGS.banner);

    useEffect(() => {
        const docRef = doc(firestore, 'settings', 'global');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as SiteSettings;
                if (data.banner) {
                    setBanner(data.banner);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    if (!banner) return null;

    return (
        <section className="mx-4 my-6 rounded-3xl bg-amber-50 dark:bg-gray-800 p-8 shadow-sm overflow-hidden relative border border-amber-100 dark:border-gray-700">
            {/* Warm Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200/20 dark:bg-yellow-500/10 rounded-full blur-2xl"></div>

            <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative mb-6 group">
                    <div className="relative size-32 rounded-full border-[6px] border-white dark:border-gray-700 shadow-xl overflow-hidden bg-gray-200 transition-transform duration-500 hover:scale-105">
                        <Image
                            src={banner.imageUrl || DEFAULT_SETTINGS.banner!.imageUrl!}
                            alt="Daily Warmth"
                            fill
                            className="object-cover"
                            sizes="128px"
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 text-orange-500 p-2 rounded-full shadow-md z-20">
                        <span className="material-symbols-outlined text-xl block animate-pulse">
                            favorite
                        </span>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-orange-500">❝</span>
                    {banner.title}
                    <span className="text-orange-500">❞</span>
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed max-w-lg mb-2 whitespace-pre-wrap">
                    {banner.message}
                </p>
            </div>
        </section>
    );
};

"use client";

import React from "react";

export const CategoryChips = () => {
    return (
        <section className="py-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar snap-x">
                {/* Active Chip */}
                <div className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "32px" }}
                        >
                            accessibility_new
                        </span>
                    </div>
                    <span className="text-sm font-semibold text-text-main dark:text-white">
                        전체
                    </span>
                </div>
                {/* Inactive Chips */}
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="snap-start shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
                    >
                        <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-muted flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "32px" }}
                            >
                                {cat.icon}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-text-muted">
                            {cat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

const categories = [
    { icon: "health_and_safety", label: "무릎" },
    { icon: "align_horizontal_center", label: "허리" },
    { icon: "front_hand", label: "손목" },
    { icon: "footprint", label: "발" },
    { icon: "compress", label: "양말" },
];

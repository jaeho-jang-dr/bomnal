
"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export const CartBadge = () => {
    const totalItems = useCartStore(state => state.totalItems());
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    }, []);

    if (!mounted || totalItems === 0) return null;

    return (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-1 shadow-sm">
            {totalItems > 99 ? "99+" : totalItems}
        </span>
    );
};

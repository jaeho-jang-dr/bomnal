"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store/cartStore";

interface CartIconProps {
  onClick: () => void;
}

export const CartIcon = ({ onClick }: CartIconProps) => {
  const totalItems = useCartStore((state) => state.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="flex items-center justify-center text-text-main dark:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
      {mounted && totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </div>
  );
};

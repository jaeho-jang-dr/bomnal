"use client";

import { useCartStore, CartItem as CartItemType } from "@/store/cartStore";
import { IconButton } from "../ui/IconButton";
import Image from "next/image";

interface CartItemProps {
    item: CartItemType;
    isSelected: boolean;
    onToggleSelect: () => void;
}

export function CartItem({ item, isSelected, onToggleSelect }: CartItemProps) {
    const { removeItem, updateQuantity } = useCartStore();

    return (
        <li className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${isSelected
            ? "bg-red-50 border-red-200"
            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
            }`}>
            {/* Checkbox */}
            <div className="relative flex items-center justify-center p-2">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onToggleSelect}
                    className="peer appearance-none size-6 rounded-lg border-2 border-gray-300 checked:border-red-500 checked:bg-white transition-all cursor-pointer shadow-sm"
                />
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-red-600 font-bold text-[24px]">check</span>
                </span>
            </div>

            {/* Image */}
            <div className="relative size-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                            {item.name}
                        </h3>
                        {item.selectedOption && (
                            <div className="flex mt-1">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    {item.selectedOption}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedOption)}
                            disabled={item.quantity <= 1}
                            className="size-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedOption)}
                            className="size-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>

                    <p className="font-bold text-sm text-primary">
                        ₩{(item.price * item.quantity).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Remove Action */}
            <IconButton
                icon="delete"
                label="Remove"
                onClick={() => removeItem(item.id, item.selectedOption)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            />
        </li>
    );
}

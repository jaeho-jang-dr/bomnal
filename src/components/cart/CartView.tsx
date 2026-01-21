"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { useState, useEffect } from "react";
import { CartItem } from "./CartItem";

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartView = ({ isOpen, onClose }: CartViewProps) => {
  const { items, totalPrice } = useCartStore();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Auto-select new items or clear invalid ones
  useEffect(() => {
    // Optional: Auto-select everything initially? Or keep user choice.
    // For now, let's auto-select all if nothing is selected (first load behavior?)
    // Actually, widespread 'cart' behavior is usually all selected by default.
    if (items.length > 0 && selectedItems.size === 0) {
      // Only if we want to force select all on open.
      // Let's settle on: Default select ALL when items change significantly?
      // Simplest: Just initialize all as selected.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setSelectedItems(new Set(items.map(i => i.id)));
    }
  }, [items.length]); // Dependency on length change mainly

  const toggleSelect = (id: string) => {
    const newDate = new Set(selectedItems);
    if (newDate.has(id)) {
      newDate.delete(id);
    } else {
      newDate.add(id);
    }
    setSelectedItems(newDate);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(i => i.id)));
    }
  };

  const selectedTotal = items
    .filter(item => selectedItems.has(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const checkoutItems = items.filter(item => selectedItems.has(item.id));
    if (checkoutItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    console.log("Proceeding to checkout with items:", checkoutItems);
    alert(`총 ${checkoutItems.length}개 상품 구매를 진행합니다.`);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out font-display ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex flex-col h-full">
        <header className="px-4 py-4 flex items-center justify-between border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">장바구니</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {items.length}
            </span>
          </div>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </header>

        {/* Select All Bar */}
        {items.length > 0 && (
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
            <input
              type="checkbox"
              checked={selectedItems.size === items.length && items.length > 0}
              onChange={toggleSelectAll}
              className="size-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            />
            <span className="font-medium">전체 선택 ({selectedItems.size}/{items.length})</span>
          </div>
        )}

        <div className="flex-grow p-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">
                shopping_cart_off
              </span>
              <p className="text-lg font-medium">장바구니가 비어있습니다.</p>
              <Button className="mt-4" onClick={onClose}>쇼핑 계속하기</Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onToggleSelect={() => toggleSelect(item.id)}
                />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 safe-bottom pb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm font-medium">총 주문금액</span>
              <div className="flex flex-col items-end">
                <span className="text-xl font-bold text-primary">
                  ₩{selectedTotal.toLocaleString()}
                </span>
                {selectedItems.size < items.length && (
                  <span className="text-xs text-gray-400 line-through">
                    ₩{totalPrice().toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className={`w-full py-4 text-lg font-bold shadow-xl transition-all ${selectedItems.size === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
              disabled={selectedItems.size === 0}
            >
              {selectedItems.size > 0 ? `${selectedItems.size}개 상품 구매하기` : '상품을 선택해주세요'}
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
};

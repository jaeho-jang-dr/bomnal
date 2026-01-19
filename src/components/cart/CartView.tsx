"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartView = ({ isOpen, onClose }: CartViewProps) => {
  const { items, totalPrice, removeItem } = useCartStore();

  const handleCheckout = () => {
    // We'll implement this later. For now, it can just log to the console.
    console.log("Proceeding to checkout with items:", items);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <header className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <IconButton icon="close" onClick={onClose} />
        </header>

        <div className="flex-grow p-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="material-symbols-outlined text-6xl mb-4">
                shopping_cart
              </span>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-md bg-gray-100 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <IconButton
                    icon="delete"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:bg-red-100"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-4 border-t dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal</span>
              <span className="text-xl font-bold">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <Button onClick={handleCheckout} className="w-full">
              Proceed to Checkout
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
};

import { create } from "zustand";
import { persist } from "zustand/middleware";

// This is a basic product type. We can expand it later.
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  options?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedOption?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Product, quantity?: number, selectedOption?: string) => void;
  updateQuantity: (itemId: string, quantity: number, selectedOption?: string) => void;
  removeItem: (itemId: string, selectedOption?: string) => void;
  removeItems: (itemsToRemove: { id: string; selectedOption?: string }[]) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, selectedOption) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id && item.selectedOption === selectedOption
          );
          if (existingItem) {
            // Increase quantity if item already exists
            const updatedItems = state.items.map((item) =>
              item.id === product.id && item.selectedOption === selectedOption
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return { items: updatedItems };
          } else {
            // Add new item
            return { items: [...state.items, { ...product, quantity, selectedOption }] };
          }
        }),
      updateQuantity: (itemId, quantity, selectedOption) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId && item.selectedOption === selectedOption
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      removeItem: (itemId, selectedOption) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === itemId && item.selectedOption === selectedOption)),
        })),
      removeItems: (itemsToRemove) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !itemsToRemove.some(
                (rem) => rem.id === item.id && rem.selectedOption === item.selectedOption
              )
          ),
        })),
      clearCart: () => set({ items: [] }),
      setCart: (items) => set({ items }),
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "bomnal-cart-storage", // name of the item in the storage (must be unique)
    }
  )
);

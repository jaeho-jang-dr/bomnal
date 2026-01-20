'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/store/cartStore';
import { getCart, setCart } from '@/lib/firebase/firestore';

const CartManager = () => {
  const { user, loading } = useAuth();
  const { items: cartItems, setCart: setCartState, clearCart } = useCartStore();
  const isInitialLoad = useRef(true);

  // Effect for handling user login/logout
  useEffect(() => {
    if (loading) return;

    const handleUserChange = async () => {
      if (user) {
        // User logged in
        const firestoreCart = await getCart(user.uid);
        const localCart = useCartStore.getState().items;

        if (firestoreCart) {
          // If firestore cart exists, it's the source of truth
          setCartState(firestoreCart);
        } else if (localCart.length > 0) {
          // If no firestore cart, but local cart exists, upload local to firestore
          await setCart(user.uid, localCart);
        }
      } else {
        // User logged out, clear the cart for the next guest
        clearCart();
      }
    };

    handleUserChange();
  }, [user, loading, setCartState, clearCart]);

  // Effect for syncing cart changes to Firestore for logged-in users
  useEffect(() => {
    // Skip the very first execution on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    if (user && !loading) {
      const syncCart = async () => {
        await setCart(user.uid, cartItems);
      };
      // Debounce this function in a real app to avoid too many writes
      syncCart();
    }
  }, [cartItems, user, loading]);

  return null; // This component does not render anything
};

export default CartManager;

// src/store/__tests__/cartStore.test.ts
import { useCartStore, Product, CartItem } from '../cartStore';
import { act } from '@testing-library/react';

const product1: Product = { id: '1', name: 'Product 1', price: 10, image: 'img1.jpg' };
const product2: Product = { id: '2', name: 'Product 2', price: 20, image: 'img2.jpg' };

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should add an item to the cart', () => {
    act(() => {
      useCartStore.getState().addItem(product1);
    });
    expect(useCartStore.getState().items).toEqual([{ ...product1, quantity: 1 }]);
  });

  it('should increase the quantity of an existing item', () => {
    act(() => {
      useCartStore.getState().addItem(product1);
      useCartStore.getState().addItem(product1);
    });
    expect(useCartStore.getState().items).toEqual([{ ...product1, quantity: 2 }]);
  });

  it('should remove an item from the cart', () => {
    act(() => {
      useCartStore.getState().addItem(product1);
      useCartStore.getState().addItem(product2);
      useCartStore.getState().removeItem(product1.id);
    });
    expect(useCartStore.getState().items).toEqual([{ ...product2, quantity: 1 }]);
  });

  it('should clear the cart', () => {
    act(() => {
      useCartStore.getState().addItem(product1);
      useCartStore.getState().clearCart();
    });
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('should set the cart', () => {
    const newCart: CartItem[] = [{ ...product2, quantity: 5 }];
    act(() => {
      useCartStore.getState().setCart(newCart);
    });
    expect(useCartStore.getState().items).toEqual(newCart);
  });

  it('should calculate the total number of items', () => {
    act(() => {
      useCartStore.getState().addItem(product1);
      useCartStore.getState().addItem(product1);
      useCartStore.getState().addItem(product2);
    });
    expect(useCartStore.getState().totalItems()).toBe(3);
  });

  it('should calculate the total price', () => {
    act(() => {
      useCartStore.getState().addItem(product1);
      useCartStore.getState().addItem(product1);
      useCartStore.getState().addItem(product2);
    });
    expect(useCartStore.getState().totalPrice()).toBe(40);
  });
});

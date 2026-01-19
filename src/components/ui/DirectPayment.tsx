'use client';

import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/store/cartStore'; 
import React from 'react';

const DirectPayment = () => {
  const { user } = useAuth();
  const { items: cart } = useCartStore();

  const handlePayment = async () => {
    if (!user || !cart || cart.length === 0) {
      alert('Please log in and add items to your cart.');
      return;
    }

    try {
      // 1. Prepare the payment on the server
      const response = await fetch('/api/payments/prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: { items: cart }, user }),
      });

      if (!response.ok) {
        throw new Error('Failed to prepare payment');
      }

      const { transactionId } = await response.json();

      // 2. Use the transactionId to open the PortOne payment window
      // (This part is simplified. You would use the PortOne SDK here)
      console.log('Requesting payment with transactionId:', transactionId);
      alert(`Simulating payment for transaction ${transactionId}`);

      // 3. After payment is complete, PortOne's webhook will be called.
      // You can also redirect the user to a success page here.
      window.location.href = '/payment/success';
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Pay with Card
    </button>
  );
};

export default DirectPayment;

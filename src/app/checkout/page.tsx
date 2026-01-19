'use client';

import React from 'react';
import DirectPayment from '@/components/ui/DirectPayment';

const CheckoutPage = () => {
  const handleNaverPay = () => {
    // Redirect to Naver Smart Store
    window.location.href = 'https://smartstore.naver.com/your-store-url'; // Replace with your actual store URL
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col gap-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Option 1: Naver Smart Store</h2>
          <p className="mb-4">
            Click the button below to complete your purchase on our Naver Smart
            Store.
          </p>
          <button
            onClick={handleNaverPay}
            className="bg-green-500 text-white p-2 rounded"
          >
            Pay with Naver
          </button>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Option 2: Direct Payment</h2>
          <p className="mb-4">
            Pay directly on our site using various payment methods.
          </p>
          <DirectPayment />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

'use client';

import React from 'react';
import Link from 'next/link';

const PaymentSuccessPage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link href="/" className="text-blue-500">
        Return to Home
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;

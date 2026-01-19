import { NextResponse } from 'next/server';
// This is a placeholder for the PortOne SDK.
// You would typically import this from the PortOne library.
const PortOne = {
  requestPayment: async (options) => {
    console.log('Requesting payment with options:', options);
    // In a real scenario, this would return a transaction ID from PortOne.
    return {
      transactionId: `tx_${Date.now()}`,
    };
  },
};
export async function POST(request: Request) {
  try {
    const { cart, user } = await request.json();

    if (!cart || !user) {
      return NextResponse.json(
        { error: 'Missing cart or user information' },
        { status: 400 }
      );
    }

    // 1. Validate the cart contents and calculate the total amount
    // (This is a simplified example)
    const amount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // 2. Call PortOne to prepare the payment and get a transaction ID
    const paymentData = {
      storeId: process.env.PORTONE_STORE_ID, // Your PortOne store ID
      channelKey: process.env.PORTONE_CHANNEL_KEY, // Your PortOne channel key
      paymentId: `pid_${Date.now()}`,
      orderName: 'Bomnal Shop Purchase',
      totalAmount: amount,
      currency: 'KRW',
      payMethod: 'CARD',
      customer: {
        fullName: user.displayName || 'Anonymous',
        email: user.email,
      },
    };

    const portOneResponse = await PortOne.requestPayment(paymentData);

    // 3. Return the transaction ID to the client
    return NextResponse.json({
      transactionId: portOneResponse.transactionId,
    });
  } catch (error) {
    console.error('Error preparing payment:', error);
    return NextResponse.json(
      { error: 'Failed to prepare payment' },
      { status: 500 }
    );
  }
}

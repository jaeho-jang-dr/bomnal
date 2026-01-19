import { NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/config';

export async function POST(request: Request) {
  try {
    const webhookData = await request.json();

    // 1. Verify the webhook signature to ensure it's from PortOne
    // (This is crucial for security and is simplified here)
    const isVerified = true; // Replace with actual verification logic

    if (!isVerified) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Check the payment status
    if (webhookData.status === 'PAID') {
      // 3. Create an order in the Firestore database
      await addDoc(collection(firestore, 'orders'), {
        customer: webhookData.customer,
        total: webhookData.totalAmount,
        status: 'Pending',
        items: webhookData.items, // Assuming items are sent in the webhook
        createdAt: new Date(),
      });
    }

    // 4. Respond to PortOne to acknowledge receipt
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Failed to handle webhook' },
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import { seedProducts } from '@/lib/firebase/seed';

export async function GET() {
    try {
        const result = await seedProducts();
        return NextResponse.json({ success: true, message: result });
    } catch {
        return NextResponse.json({ success: false, error: 'Seeding failed' }, { status: 500 });
    }
}

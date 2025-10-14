import { NextResponse } from 'next/server';
import { getGiftById } from '@/lib/data';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const gift = await getGiftById(params.id);
  if (!gift) {
    return NextResponse.json({ message: 'Gift not found' }, { status: 404 });
  }
  return NextResponse.json(gift);
}

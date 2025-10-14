import { NextResponse } from 'next/server';
import { fetchGifts } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await fetchGifts({
    search: searchParams.get('search') ?? undefined,
    gender: searchParams.get('gender') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    theme: searchParams.get('theme') ?? undefined,
    sort: (searchParams.get('sort') ?? undefined) as never,
    in_stock: searchParams.get('in_stock') ?? undefined
  });

  return NextResponse.json(data);
}

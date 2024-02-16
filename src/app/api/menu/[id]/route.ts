import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const menu = await db.item.findUnique({ where: { id } });

    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

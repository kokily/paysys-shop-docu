import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const item = await db.item.findUnique({ where: { id } });

    if (!item) {
      return NextResponse.json(
        { error: '존재하지 않는 품목입니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

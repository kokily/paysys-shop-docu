import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddItemPayload;

  try {
    await checkAdmin();

    const itemCount = await db.item.count();
    const item = await db.item.create({
      data: { ...body, num: itemCount + 1 },
    });

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

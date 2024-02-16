import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const body = (await req.json()) as AddItemPayload;

  try {
    await checkAdmin();

    const item = await db.item.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

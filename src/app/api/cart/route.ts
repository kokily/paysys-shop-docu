import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const cart = await db.cart.findFirst({
      where: {
        userId: user.id,
        completed: false,
        deleted: false,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { message: '저장된 카트가 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

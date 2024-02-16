import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function PATCH(_: NextRequest, { params: { id } }: any) {
  try {
    const user = await getSessionUser();
    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json(
        { error: '존재하지 않는 빌지입니다.' },
        { status: 404 },
      );
    }

    const cart = await db.cart.update({
      where: { id: bill.cartId! },
      data: {
        completed: false,
        updatedAt: new Date(),
      },
    });

    await db.bill.delete({ where: { id } });

    return NextResponse.json(cart);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

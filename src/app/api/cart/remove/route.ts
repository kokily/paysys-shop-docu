import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function DELETE(_: NextRequest) {
  try {
    const { id: userId } = await getSessionUser();

    const cart = await db.cart.findFirst({
      where: {
        userId,
        completed: false,
        deleted: false,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: '카트가 존재하지 않습니다.' },
        { status: 404 },
      );
    } else {
      await db.cart.update({
        where: { id: cart.id },
        data: {
          deleted: true,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({ message: '카트 삭제 완료' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

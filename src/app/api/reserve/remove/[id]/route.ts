import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();

    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json(
        { error: '존재하지 않는 빌지입니다.' },
        { status: 404 },
      );
    }

    await db.bill.update({
      where: { id },
      data: {
        reserve: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ message: '예약금 삭제' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

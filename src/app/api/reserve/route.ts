import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { checkAdmin } from '@/helper/server/utils';

export async function POST(req: NextRequest) {
  const { billId, reserve } = (await req.json()) as AddReservePayload;

  try {
    await checkAdmin();

    const bill = await db.bill.findUnique({
      where: { id: billId },
    });

    if (!bill) {
      return NextResponse.json(
        { error: '존재하지 않는 빌지입니다.' },
        { status: 404 },
      );
    }

    await db.bill.update({
      where: { id: bill.id },
      data: {
        reserve,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(bill);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

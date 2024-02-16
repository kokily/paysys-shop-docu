import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { serializeUser } from '@/helper/client/utils';
import { checkAdmin } from '@/helper/server/utils';

export async function PATCH(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAdmin();

    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(
        { error: '존재하지 않는 사용자입니다.' },
        { status: 404 },
      );
    }

    await db.user.update({
      where: { id },
      data: {
        admin: false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(serializeUser(user));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';
import { serializeUser } from '@/helper/client/utils';

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as PasswordPayload;

  try {
    const session = await getSessionUser();
    const user = await db.user.findUnique({ where: { id: session.id } });

    if (!user) {
      return NextResponse.json(
        { error: '등록되지 않은 사용자입니다.' },
        { status: 404 },
      );
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(password, 10),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(serializeUser(user));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

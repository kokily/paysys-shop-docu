import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/helper/server/database';
import { signJwtAccessToken } from '@/helper/client/tokens';

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json()) as AuthPayload;

  try {
    const user = await db.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPassword } = user;
      const token = signJwtAccessToken(userWithoutPassword);
      const result = {
        ...userWithoutPassword,
        token,
      };

      return NextResponse.json(result);
    } else {
      throw new Error('사용자가 없거나 비밀번호가 틀렸습니다.');
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { serializeUser } from '@/helper/client/utils';
import { checkAdmin, getQuery } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  try {
    await checkAdmin();

    const username = getQuery(req, 'username');
    const cursor = getQuery(req, 'cursor');

    const cursorObj = cursor === '' ? undefined : { id: cursor };
    const limit = 40;

    const users = await db.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      users.map((user) => {
        return serializeUser(user);
      }),
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

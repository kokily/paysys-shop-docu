import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getQuery } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  try {
    const divide = getQuery(req, 'divide');
    const native = getQuery(req, 'native');

    const menu = await db.item.findMany({
      where: {
        divide: {
          contains: divide,
        },
        native: {
          contains: native,
        },
      },
    });

    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

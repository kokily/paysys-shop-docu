import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getSessionUser } from '@/helper/server/utils';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    const user = await getSessionUser();
    const bill = await db.bill.findUnique({ where: { id } });

    if (!bill) {
      return NextResponse.json(
        { error: '존재하지 않는 빌지입니다.' },
        { status: 404 },
      );
    }

    if (bill.userId === user.id) {
      // 빌지 작성자가 로그인 중이라면
      await db.bill.delete({ where: { id } });

      return NextResponse.json({ message: '빌지 삭제' });
    } else {
      // 빌지 작성자가 아니라면
      if (user.admin) {
        // 관리자가 로그인 중이라면
        await db.bill.delete({ where: { id } });

        return NextResponse.json({ message: '빌지 삭제' });
      } else {
        // 빌지 작성자도 아니면서 관리자도 아니면
        return NextResponse.json(
          { error: '삭제 권한이 없습니다.' },
          { status: 403 },
        );
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

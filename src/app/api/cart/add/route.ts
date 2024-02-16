import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as AddCartPayload;

  try {
    const item = await db.item.findUnique({
      where: { id: body.itemId },
    });

    if (!item) {
      return NextResponse.json(
        { message: '해당 품목이 없습니다.' },
        { status: 404 },
      );
    }

    // Cart in Current User
    const prevCart = await db.cart.findFirst({
      where: {
        userId: body.userId,
        completed: false,
        deleted: false,
      },
    });

    // 추가해야 할 품목 모델
    const addItemModel: AddItemModel = {
      id: item.id,
      name: item.name,
      divide: item.divide,
      native: item.native,
      unit: item.unit,
      price: body.price,
      count: body.count,
      amount: body.count * body.price,
    };

    // Cart 분기점 (기존 카트 존재유무)
    if (!prevCart) {
      // 기존 카트가 없을 때 카트 생성
      const cart = await db.cart.create({
        data: {
          items: [addItemModel as any],
          userId: body.userId,
        },
      });

      return NextResponse.json(cart);
    } else {
      // 기존 카트가 있을 때 품목만 추가
      const updateCartItems = [...prevCart.items, addItemModel];
      const cart = await db.cart.update({
        where: { id: prevCart.id },
        data: {
          ...prevCart,
          items: updateCartItems as any,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(cart);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

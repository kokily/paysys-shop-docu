'use client';

import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import client from '@/helper/client/client';
import { ReadMenu } from '@/components/menu/read/ReadMenu';

// API
export async function readMenuAPI(id: string) {
  const response = await client.get<Item>(`/menu/${id}`);
  return response.data;
}

export default function ReadMenuPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = useSession();
  const router = useRouter();

  const [inputs, setInputs] = useState({
    count: '',
    price: '',
  });
  const { count, price } = inputs;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['readMenu'],
    queryFn: () => readMenuAPI(id),
    enabled: !!id,
  });

  // Data Mutations

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onBack = () => {
    router.back();
  };

  const onAddCart = async (e: SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (menu) {
      if (menu.price !== 0) {
        setInputs({ ...inputs, price: menu.price.toString() });
      } else {
        setInputs({ ...inputs, price: '' });
      }
    }
  }, [menu]);

  return menu ? (
    <ReadMenu
      menu={menu}
      count={count}
      price={price}
      onChange={onChange}
      onBack={onBack}
      onAddCart={onAddCart}
    />
  ) : (
    <div>Loading</div>
  );
}

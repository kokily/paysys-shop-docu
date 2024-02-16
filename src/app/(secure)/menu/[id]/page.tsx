'use client';

import type { Item } from '@prisma/client';

import client from '@/helper/client/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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

  return <div>ReadMenuPage</div>;
}

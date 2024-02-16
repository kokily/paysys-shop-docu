'use client';

import type { Item } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

import { ListMenu } from '@/components/menu/list/ListMenu';
import client from '@/helper/client/client';

// API
async function listMenuAPI(divide: string, native: string) {
  const queryString = qs.stringify({ divide, native });
  const response = await client.get<Array<Item>>(`/menu?${queryString}`);
  return response.data;
}

export default function ListMenuPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // Query String
  const divide = searchParams.get('divide') as string;
  const native = searchParams.get('native') as string;

  // Data Fetching
  const { data: menu } = useQuery({
    queryKey: ['listMenu'],
    queryFn: () => listMenuAPI(divide, native),
    enabled: !!divide && !!native,
    staleTime: 0,
  });

  const onBack = () => {
    router.back();
  };

  const onReadMenu = (id: string) => {
    queryClient.invalidateQueries({ queryKey: ['readMenu', id] });
    router.push(`/menu/${id}`);
  };

  return menu ? (
    <ListMenu menu={menu} onBack={onBack} onReadMenu={onReadMenu} />
  ) : (
    <div>Loading</div>
  );
}

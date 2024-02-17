'use client';

import type { Bill } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import qs from 'qs';

import client from '@/helper/client/client';
import { useObserver } from '@/helper/client/scrolling';
import { ListFronts } from '@/components/fronts/ListFronts';

// API
async function listFrontsAPI(queries: ListBillsQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<Bill>>(`/bills?${queryString}`);
  return response.data;
}

export default function ListFrontsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [scrollY, setScrollY] = useLocalStorage('listFrontsScroll', 0);

  const [inputs, setInputs] = useState({
    search: '',
    hall: '',
    userId: '',
  });
  const { search, hall, userId } = inputs;

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['fronts'],
    queryFn: ({ pageParam }) =>
      listFrontsAPI({ cursor: pageParam, title: search, hall, userId }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const fronts = useMemo(() => {
    if (!data) return [];

    return ([] as Array<Bill>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onHallPage = async (hall: string) => {
    queryClient.invalidateQueries({ queryKey: ['fronts'] });
    await setInputs({ ...inputs, hall });
    await refetch();
  };

  const onUserPage = async (userId: string) => {
    queryClient.invalidateQueries({ queryKey: ['fronts'] });
    await setInputs({ ...inputs, userId });
    await refetch();
  };

  const onReadFront = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/fronts/${id}`);
  };

  // Intersection Observer
  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <ListFronts
      fronts={fronts}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onHallPage={onHallPage}
      onUserPage={onUserPage}
      onReadFront={onReadFront}
      setTarget={setTarget}
    />
  );
}

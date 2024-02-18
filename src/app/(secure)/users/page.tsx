'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';
import qs from 'qs';

import client from '@/helper/client/client';
import { useObserver } from '@/helper/client/scrolling';
import { ListUsers } from '@/components/users/ListUsers';

// API
async function listUsersAPI(queries: ListUsersQueries) {
  const queryString = qs.stringify(queries);
  const response = await client.get<Array<SerializeUser>>(
    `/users?${queryString}`,
  );
  return response.data;
}

export default function ListUsersPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('listUsersScroll', 0);

  const [search, setSearch] = useState('');

  // Data Fetching
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['users'],
    queryFn: ({ pageParam }) =>
      listUsersAPI({ cursor: pageParam, username: search }),
    getNextPageParam: (data) =>
      data && data.length === 40 ? data[data.length - 1].id : undefined,
    enabled: true,
  });

  const users = useMemo(() => {
    if (!data) return [];

    return ([] as Array<SerializeUser>).concat(...data.pages);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  const onReadUser = (id: string) => {
    setScrollY(window.scrollY);
    router.push(`/users/${id}`);
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
    <ListUsers
      users={users}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onReadUser={onReadUser}
      setTarget={setTarget}
    />
  );
}

import type { Item } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { readItemAPI } from '../[id]/page';
import client from '@/helper/client/client';

// API
async function addItemAPI(payload: AddItemPayload) {
  const response = await client.post<Item>('/items/add', payload);
  return response.data;
}

async function updateItemAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddItemPayload;
}) {
  const response = await client.patch<Item>(`/items/update/${id}`, payload);
  return response.data;
}

interface Props {
  id?: string;
}

export function useAddItem({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialState = {
    name: '',
    divide: '식사(뷔페)',
    native: '현역',
    unit: '',
    price: '',
  };

  const [inputs, setInputs] = useState(initialState);
  const { name, divide, native, unit, price } = inputs;

  // Data Fetching for update
  const { data: item } = useQuery({
    queryKey: ['updateItem'],
    queryFn: () => readItemAPI(id!),
    enabled: !!id && id.length > 3,
  });

  // Mutations
  const addItemMutate = useMutation({ mutationFn: addItemAPI });
  const updateItemMutate = useMutation({ mutationFn: updateItemAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onBack = () => {
    router.back();
  };

  const onAddItem = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (id && id.length > 3) {
      // Update Item
      await updateItemMutate.mutateAsync(
        {
          id,
          payload: {
            name,
            divide,
            native,
            unit,
            price: parseInt(price),
          },
        },
        {
          onSuccess: () => {
            setInputs({ ...initialState });
            toast.success('품목 수정!');
            queryClient.invalidateQueries({ queryKey: ['items', 'item', id] });
            router.back();
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      // Add Item
      await addItemMutate.mutateAsync(
        {
          name,
          divide,
          native,
          unit,
          price: parseInt(price),
        },
        {
          onSuccess: () => {
            setInputs({ ...initialState });
            toast.success('품목 추가!');
            queryClient.invalidateQueries({ queryKey: ['items', 'item'] });
            router.back();
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (item) {
      setInputs({
        name: item.name,
        divide: item.divide,
        native: item.native,
        unit: item.unit,
        price: item.price.toString(),
      });
    }
  }, [item]);

  return {
    name,
    divide,
    native,
    unit,
    price,
    onChange,
    onBack,
    onAddItem,
  };
}

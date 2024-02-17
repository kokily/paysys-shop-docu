'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/client';
import { AddReserve } from '@/components/reserve/AddReserve';

// API
async function addReserveAPI(payload: AddReservePayload) {
  const response = await client.post('/reserve', payload);
  return response.data;
}

export default function AddReservePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [reserve, setReserve] = useState('');

  // Mutations
  const addReserveMutate = useMutation({ mutationFn: addReserveAPI });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReserve(e.target.value);
  };

  const onBack = () => {
    router.back();
  };

  const onAddReserve = async (e: SyntheticEvent) => {
    e.preventDefault();

    await addReserveMutate.mutateAsync(
      {
        reserve: parseInt(reserve),
        billId: id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['front', id] });
          router.back();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  return (
    <AddReserve
      reserve={reserve}
      onBack={onBack}
      onChange={onChange}
      onAddReserve={onAddReserve}
    />
  );
}

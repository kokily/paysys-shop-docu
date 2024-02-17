'use client';

import type { Item } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/client';
import { useRemoveModal } from '@/helper/client/hooks';
import { ReadItem } from '@/components/item/ReadItem';
import { Modal } from '@/components/common/Modal';

// API
export async function readItemAPI(id: string) {
  const response = await client.get<Item>(`/items/${id}`);
  return response.data;
}

async function removeItemAPI(id: string) {
  const response = await client.delete(`/items/remove/${id}`);
  return response.data;
}

export default function ReadItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: item } = useQuery({
    queryKey: ['item'],
    queryFn: () => readItemAPI(id),
    enabled: !!id,
  });

  // Mutations
  const removeItemMutate = useMutation({ mutationFn: removeItemAPI });

  const onBack = () => {
    router.back();
  };

  const onUpdateItemPage = () => {
    router.push(`/items/update/${id}`);
  };

  const onRemoveItem = async () => {
    await removeItemMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('삭제 완료');
        queryClient.invalidateQueries({ queryKey: ['items', 'item', id] });
        router.back();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove Modal
  const itemModal = useRemoveModal({ onRemove: onRemoveItem });

  return item ? (
    <>
      <ReadItem
        item={item}
        onBack={onBack}
        onUpdateItemPage={onUpdateItemPage}
        onModalClick={itemModal.onModalClick}
      />
      <Modal
        visible={itemModal.modal}
        title="품목 삭제"
        content="정말 삭제하시나요?"
        onConfirm={itemModal.onConfirm}
        onCancel={itemModal.onCancel}
      />
    </>
  ) : (
    <div>Loading</div>
  );
}

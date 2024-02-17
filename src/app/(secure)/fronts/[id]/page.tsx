'use client';

import type { Cart, Bill } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/client';
import { useRemoveModal } from '@/helper/client/hooks';
import { ReadFront } from '@/components/front/ReadFront';
import { Modal } from '@/components/common/Modal';

// API
async function readFrontAPI(id: string) {
  const response = await client.get<Bill>(`/bills/${id}`);
  return response.data;
}

async function restoreBillAPI(id: string) {
  const response = await client.patch<Cart>(`/bills/restore/${id}`);
  return response.data;
}

async function removeReserveAPI(id: string) {
  const response = await client.delete(`/reserve/remove/${id}`);
  return response.data;
}

async function removeBillAPI(id: string) {
  const response = await client.delete(`/bills/remove/${id}`);
  return response.data;
}

export default function ReadFrontPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: front, refetch } = useQuery({
    queryKey: ['front'],
    queryFn: () => readFrontAPI(id),
    enabled: !!id,
    staleTime: 150,
  });

  // Data Mutations
  const restoreBillMutate = useMutation({ mutationFn: restoreBillAPI });
  const removeReserveMutate = useMutation({ mutationFn: removeReserveAPI });
  const removeBillMutate = useMutation({ mutationFn: removeBillAPI });

  const onBack = () => {
    router.back();
  };

  const onRestoreBill = async () => {
    if (window.confirm('주의! 빌지가 삭제되고 전표확인으로 돌아갑니다.')) {
      await restoreBillMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['fronts', 'front', id, 'cart'],
          });
          router.replace('/cart');
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      });
    } else {
      return;
    }
  };

  const onReservePage = () => {
    router.push(`/fronts/update/${id}`);
  };

  const onRemoveReserve = async () => {
    await removeReserveMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['front', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  const onRemoveBill = async () => {
    await removeBillMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['fronts', 'front', id] });
        router.replace('/fronts');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Modal
  const frontModal = useRemoveModal({ onRemove: onRemoveBill });

  return front && data ? (
    <>
      <ReadFront
        front={front}
        userId={data.user.id}
        isAdmin={data.user.admin}
        onBack={onBack}
        onRestoreBill={onRestoreBill}
        onReservePage={onReservePage}
        onRemoveReserve={onRemoveReserve}
        onModalClick={frontModal.onModalClick}
      />
      <Modal
        visible={frontModal.modal}
        title="빌지 삭제"
        content="정말 삭제하시나요?"
        onCancel={frontModal.onCancel}
        onConfirm={frontModal.onConfirm}
      />
    </>
  ) : (
    <div>Loading</div>
  );
}

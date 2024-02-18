'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/client';
import { useRemoveModal } from '@/helper/client/hooks';
import { Modal } from '@/components/common/Modal';
import { ReadUser } from '@/components/user/ReadUser';

// API
export async function readUserAPI(id: string) {
  const response = await client.get<SerializeUser>(`/users/${id}`);
  return response.data;
}

async function removeUserAPI(id: string) {
  const response = await client.delete(`/users/remove/${id}`);
  return response.data;
}

async function setAdminAPI(id: string) {
  const response = await client.patch(`/users/admin/${id}`);
  return response.data;
}

async function setEmployeeAPI(id: string) {
  const response = await client.patch(`/users/employee/${id}`);
  return response.data;
}

export default function ReadUserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Fetching
  const { data: user, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => readUserAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const removeUserMutate = useMutation({ mutationFn: removeUserAPI });
  const setAdminMutate = useMutation({ mutationFn: setAdminAPI });
  const setEmployeeMutate = useMutation({ mutationFn: setEmployeeAPI });

  const onBack = () => {
    router.back();
  };

  const onRemoveUser = async () => {
    await removeUserMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  const onSetIdentity = async (identity: IdentifyType) => {
    if (identity === 'admin') {
      await setAdminMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      });
    } else {
      await setEmployeeMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users', 'user', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      });
    }
  };

  // User Modal
  const userModal = useRemoveModal({ onRemove: onRemoveUser });

  return user ? (
    <>
      <ReadUser
        user={user}
        onBack={onBack}
        onSetIdentity={onSetIdentity}
        onModalClick={userModal.onModalClick}
      />
      <Modal
        visible={userModal.modal}
        title="사용자 삭제"
        content="정말 삭제하시나요?"
        onConfirm={userModal.onConfirm}
        onCancel={userModal.onCancel}
      />
    </>
  ) : (
    <div>Loading</div>
  );
}

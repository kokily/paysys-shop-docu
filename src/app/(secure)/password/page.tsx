'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/client';
import { ChangePassword } from '@/components/password/ChangePassword';

// API
async function changePasswordAPI(payload: PasswordPayload) {
  const response = await client.post<SerializeUser>('/auth/password', payload);
  return response.data;
}

export default function ChangePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState('');

  // Data Mutations
  const changePasswordMutate = useMutation({ mutationFn: changePasswordAPI });

  const onBack = () => {
    router.back();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    await changePasswordMutate.mutateAsync(
      { password },
      {
        onSuccess: () => {
          toast.success('비밀번호 변경!');
          router.back();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  return (
    <ChangePassword
      password={password}
      onBack={onBack}
      onChange={onChange}
      onChangePassword={onChangePassword}
    />
  );
}

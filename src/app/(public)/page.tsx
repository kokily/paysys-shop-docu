'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { Login } from '@/components/auth/Login';

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  // States
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/soldier',
    });

    if (response?.error) {
      toast.error(response.error);
    }
  };

  if (status === 'authenticated') {
    router.replace('/soldier');
  }

  return (
    <Login
      username={username}
      password={password}
      onChange={onChange}
      onLogin={onLogin}
    />
  );
}

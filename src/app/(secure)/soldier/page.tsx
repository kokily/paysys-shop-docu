'use client';

import { useSession } from 'next-auth/react';

export default function SoldierPage() {
  const { data } = useSession();

  return (
    <div>
      <h2>SoldierPage</h2>

      <p>{JSON.stringify(data?.user)}</p>
    </div>
  );
}

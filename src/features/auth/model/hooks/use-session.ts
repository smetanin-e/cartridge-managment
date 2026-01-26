'use client';

import { useSession } from 'next-auth/react';

export const useUserSession = () => {
  const { data, status } = useSession();

  const user = data?.user
    ? {
        ...data.user,
        id: Number(data.user.id),
      }
    : undefined;

  return { user, isLoading: status === 'loading' };
};

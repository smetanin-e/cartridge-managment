'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { UserRole } from '@prisma/client';
import { useUserSession } from '@/features/auth/model/hooks/use-session';
import { useGetUsers } from '../api/use-get-users';
import { shortName } from '../lib/short-name';
import { FormInput, FormSelect } from '@/shared/components/form';
import { convertUsersForSelect } from '../lib/convert-users-for-select';

export const ResponsibleForm: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const currentResponsible = watch('responsible');
  const { user: currentUser } = useUserSession();
  const { agents } = useGetUsers();

  React.useEffect(() => {
    if (!currentUser || !agents?.length) return;

    // если уже есть значение (например, пользователь выбрал вручную) — не перезаписываем
    if (currentResponsible) return;

    const foundAgent = agents.find((a) => a.id === currentUser.id);
    if (foundAgent) {
      setValue('responsible', shortName(foundAgent));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, setValue, currentResponsible]);

  if (!currentUser) return null;

  return currentUser.role === UserRole.ADMIN ? (
    <FormSelect
      name='responsible'
      label='Ответственный'
      required
      data={convertUsersForSelect(agents)}
    />
  ) : (
    <FormInput
      name='responsible'
      label='Ответственный'
      type='text'
      required
      readOnly
      value={shortName(currentUser)}
    />
  );
};

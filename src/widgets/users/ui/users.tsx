import { AuthUser } from '@/entities/user/model/types';
import { UserList } from '@/entities/user/ui/user-list';
import { CreateUserModal } from '@/features/user/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import React from 'react';

interface Props {
  className?: string;
  user: AuthUser;
}

export const Users: React.FC<Props> = ({ user }) => {
  return (
    <Card>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Список пользователей</CardTitle>
        <CreateUserModal />
      </CardHeader>
      <CardContent>
        <UserList admin={user} />
      </CardContent>
    </Card>
  );
};

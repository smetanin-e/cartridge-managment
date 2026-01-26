'use client';
import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/components/ui';

import { LoadingBounce } from '@/shared/components';
import { AuthUser } from '@/entities/user/model/types';
import { useGetUsers } from '@/entities/user/api/use-get-users';
import { UserItem } from '@/entities/user/ui/user-item';

interface Props {
  className?: string;
  admin: AuthUser;
}

export const UserList: React.FC<Props> = ({ admin }) => {
  const { data, isLoading } = useGetUsers();
  const users = data ? data : [];
  return (
    <div className='relative min-h-[210px]'>
      {isLoading ? (
        <LoadingBounce />
      ) : (
        <>
          {users.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>Нет пользователей</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Логин</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead className=' w-40'>Статус</TableHead>
                  <TableHead className='text-right'>Управление</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <UserItem key={user.id} user={user} currentUserId={admin.id} />
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  );
};

import { TableCell, TableRow } from '@/shared/components/ui';
import React from 'react';
import { Agent } from '../model/types';
import { Minus, Shield } from 'lucide-react';
import { ChangeUserStatus } from '@/features/user/ui/change-user-status';
import { UpdateUserModal } from '@/features/user/ui/update-user-modal';
import { ResetPasswordModal } from '@/features/user/ui';
import { DeleteUser } from '@/features/user/ui/delete-user';

interface Props {
  className?: string;
  user: Agent;
  currentUserId: number;
}

export const UserItem: React.FC<Props> = ({ user, currentUserId }) => {
  return (
    <TableRow>
      <TableCell className='flex items-center gap-4 py-4'>
        <div className='font-medium'>{`${user.surname} ${user.firstName} ${user.lastName}`}</div>
        {currentUserId === user.id && <Shield className='h-5 w-5' color='green' />}
      </TableCell>
      <TableCell>{user.login}</TableCell>
      <TableCell>{user.role}</TableCell>

      <TableCell>
        <div className='flex items-center gap-2'>
          <ChangeUserStatus userId={user.id} status={user.status} />
          <span>{user.status ? 'Активен' : 'Заблокирован'}</span>
        </div>
      </TableCell>
      <TableCell className='text-right flex gap-4 justify-end'>
        {user.id === currentUserId ? (
          <div className='flex  items-center gap-4'>
            <div className='h-8 w-8 p-0 flex items-center'>
              <Minus className='h-4 w-8 ' />
            </div>
            <div className='h-8 w-8 p-0 flex items-center'>
              <Minus className='h-4 w-8 ' />
            </div>
          </div>
        ) : (
          <>
            <UpdateUserModal user={user} />
            <DeleteUser
              userId={user.id}
              userName={`${user.surname} ${user.firstName} ${user.lastName}`}
            />
          </>
        )}
        <div className='flex items-center justify-center'>
          <ResetPasswordModal id={user.id} />
        </div>
      </TableCell>
    </TableRow>
  );
};

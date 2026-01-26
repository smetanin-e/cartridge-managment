'use client';
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { stringToColor, userInitials } from '@/shared/lib';
import Link from 'next/link';
import { AuthUser } from '../model/types';
import { Logout } from '@/features/auth/ui/logout';
import { ChangePasswordModal } from '@/features/user/ui';

interface Props {
  className?: string;
  user: AuthUser;
}

export const Profile: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const name = `${user?.surname} ${user?.firstName} ${user?.lastName}`;
  const initials = userInitials(name);
  const bgColor = stringToColor(name);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Avatar className='h-11 w-11 cursor-pointer'>
            <AvatarFallback style={{ backgroundColor: bgColor }} className='text-white'>
              {initials}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align='end' className='px-2 py-2 text-right'>
          <div className='flex justify-end items-center'>
            <p className='font-bold text-[12px] px-4'>{`${user.surname} ${user.firstName[0]}.${user.lastName[0]}.`}</p>
            <ChangePasswordModal id={user.id} />
          </div>

          <div className='py-2'>
            {user.role === 'ADMIN' && (
              <p className='my-4 px-4 cursor-pointer hover:text-shadow-lg'>
                <Link href={'/admin'} onClick={() => setOpen(false)}>
                  Администрирование
                </Link>
              </p>
            )}

            <Logout />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

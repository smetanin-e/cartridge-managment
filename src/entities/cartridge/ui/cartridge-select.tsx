import { FormCustomSelect } from '@/shared/components/form';
import React from 'react';
import { CartridgeDTO } from '../model/types';
import { Badge } from '@/shared/components/ui';
import { getStatusBadge } from './get-status-badge';

interface Props {
  className?: string;
  items: CartridgeDTO[];
  name: string;
  label: string;
}

export const CartridgeSelect: React.FC<Props> = ({ items, name, label }) => {
  return (
    <>
      <FormCustomSelect<CartridgeDTO>
        name={name}
        label={label}
        items={items}
        placeholder='---'
        getKey={(c) => c.id}
        getLabel={(c) => c.label}
        renderValue={(c) => (
          <div className='flex gap-2 items-center flex-1'>
            <span>{c.label}</span>
            <Badge variant='secondary'>{c.model?.model}</Badge>
            {getStatusBadge(c.status)}
          </div>
        )}
        renderItem={(c) => (
          <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full'>
            <div>{c.label}</div>
            <Badge variant='outline'>
              <strong>{c.model?.model}</strong>
            </Badge>
            <div>{getStatusBadge(c.status)}</div>
          </div>
        )}
      />
    </>
  );
};

import React from 'react';

interface Props {
  className?: string;
  notes: string;
}

export const Notes: React.FC<Props> = ({ notes }) => {
  return (
    <div>
      <div className='text-sm text-muted-foreground'>Комментарий:</div>
      <div className='text-sm text-secondary-foreground'>{` ${notes}`}</div>
    </div>
  );
};

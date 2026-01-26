'use client';
import React from 'react';
import { StatsCard } from './stats-card';
import { CartridgeStatus } from '@prisma/client';
import { CARTRIDGE_STATUS_CONFIG } from '@/shared/constants';
import { useGetCartridges } from '@/entities/cartridge/api/use-get-cartridges';

interface Props {
  className?: string;
}

export const Stats: React.FC<Props> = () => {
  const { cartridges, isLoading } = useGetCartridges();

  const statuses = (Object.keys(CARTRIDGE_STATUS_CONFIG) as CartridgeStatus[]).filter(
    (s) => s !== CartridgeStatus.DISCARDED,
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6'>
      {statuses.map((status) => (
        <StatsCard key={status} status={status} cartridges={cartridges} loading={isLoading} />
      ))}
    </div>
  );
};

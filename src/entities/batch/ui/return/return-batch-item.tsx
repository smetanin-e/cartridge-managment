import React from 'react';

import { TableCell, TableRow } from '@/shared/components/ui';
import { getBatchStatusBadge } from '../get-batch-status-badge';
import { BatchStatus } from '@prisma/client';
import { BatchDTO } from '../../model/types';
import { ShowBatchModal } from './show-batch-modal';
import { ReturnBatchModal } from '@/features/batch/ui';

interface Props {
  className?: string;
  batch: BatchDTO;
}
//TODO переместить сюда batch от родителя
export const ReturnBatchItem: React.FC<Props> = ({ batch }) => {
  const getAvailableCartridges = (batch: BatchDTO) => {
    return batch.cartridges.filter((c) => !c.returned);
  };

  const getReturnedCartridges = (batch: BatchDTO) => {
    return batch.cartridges.filter((c) => c.returned);
  };

  return (
    <TableRow>
      <TableCell>{batch.date}</TableCell>
      <TableCell>{getBatchStatusBadge(batch.status)}</TableCell>
      <TableCell>
        <div className='flex flex-col text-sm'>
          <span>Всего: {batch.cartridges.length}</span>
          {batch.status === BatchStatus.PARTIAL_RETURN && (
            <>
              <span className='text-green-600'>
                Вернулось: {getReturnedCartridges(batch).length}
              </span>
              <span className='text-orange-600'>
                Осталось: {getAvailableCartridges(batch).length}
              </span>
            </>
          )}
        </div>
      </TableCell>
      <TableCell>{batch.responsible}</TableCell>
      <TableCell className='text-right'>
        <div className='flex gap-2 justify-end'>
          <ShowBatchModal
            date={batch.date}
            responsible={batch.responsible}
            status={getBatchStatusBadge(batch.status)}
            cartridges={batch.cartridges}
            batch={batch} //TODO пересмотреть
          />
          <ReturnBatchModal
            batchId={batch.id}
            date={batch.date}
            responsible={batch.responsible}
            status={getBatchStatusBadge(batch.status)}
            cartridges={batch.cartridges}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

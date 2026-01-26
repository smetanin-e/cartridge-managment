'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { BatchStatus } from '@prisma/client';
import { useGetBatches } from '@/entities/batch/api/use-get-batches';
import { LoadingBounce } from '@/shared/components';
import { ReturnBatchItem } from '@/entities/batch/ui/';

interface Props {
  className?: string;
}

export const WorkBatches: React.FC<Props> = () => {
  const { batches, isLoading } = useGetBatches([
    BatchStatus.IN_PROGRESS,
    BatchStatus.PARTIAL_RETURN,
  ]);

  return (
    <Card className='mb-6 min-h-[184px] relative'>
      {isLoading ? (
        <LoadingBounce />
      ) : (
        <>
          <CardHeader>
            <CardTitle>Партии в работе ({batches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {batches.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>Нет партий в работе</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата отправки партии</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Картриджей</TableHead>
                    <TableHead>Ответственный</TableHead>
                    <TableHead className='text-right'>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <ReturnBatchItem key={batch.id} batch={batch} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

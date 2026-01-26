import { batchRepository } from '@/entities/batch/repository/batch-repository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { BatchStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;
    const statuses = searchParams.getAll('status') as BatchStatus[];

    const batchesRaw = await batchRepository.getFilterByStatuses(statuses, take, skip);

    const batches = batchesRaw.map((batch) => ({
      id: batch.id,
      date: batch.date,
      responsible: batch.responsible,
      notes: batch.notes,
      status: batch.status,
      partialReturnDate: batch.partialReturnDate,
      cartridges: batch.cartridgesInBatch
        .map((cb) => ({
          ...cb.cartridge,
          returned: cb.returned,
          returnDate: cb.returnDate,
          returnResponsible: cb.returnResponsible,
          returnNotes: cb.returnNotes,
        }))
        .sort((a, b) => a.numericLabel - b.numericLabel),
    }));

    return NextResponse.json(batches);
  } catch (error) {
    console.error('[API_BATCH_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

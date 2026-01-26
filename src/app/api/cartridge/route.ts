import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { CartridgeStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const cartridgeStatuses = searchParams.getAll('status') as CartridgeStatus[];
    const statuses = cartridgeStatuses ? cartridgeStatuses : null;

    const cartridges = await cartridgeRepository.getFilterByStatuses(statuses);
    return NextResponse.json(cartridges);
  } catch (error) {
    console.error('[API_CARTRIDGE_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { printerRepository } from '@/entities/printer/repository/printerRepository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const printers = await printerRepository.getPrinters();
    return NextResponse.json(printers);
  } catch (error) {
    console.error('[API_MODEL_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

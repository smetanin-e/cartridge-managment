import { modelRepository } from '@/entities/cartridge-model/repository/model-repository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const models = await modelRepository.getModels();
    return NextResponse.json(models);
  } catch (error) {
    console.error('[API_MODEL_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

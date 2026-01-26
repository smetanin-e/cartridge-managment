import { departamentRepository } from '@/entities/departament/repository/departament-repository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const departaments = await departamentRepository.getDepartaments();
    return NextResponse.json(departaments);
  } catch (error) {
    console.error('[API_DEPARTAMENT_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

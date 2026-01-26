import { userRepository } from '@/entities/user/repository/user-repository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const users = await userRepository.getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('[API_USER_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

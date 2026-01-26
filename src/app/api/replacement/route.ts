import { replacementRepository } from '@/entities/replacement/repository/replacementRepository';
import { validateApiToken } from '@/shared/lib/auth/validate-api-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (!validateApiToken(req)) {
    return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search')?.trim() || '';
    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;

    const remlacements = await replacementRepository.getFilteredRemlacements(search, take, skip);
    return NextResponse.json(remlacements);
  } catch (error) {
    console.error('[API_REPLACEMENT_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

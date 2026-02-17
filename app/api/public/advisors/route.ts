import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const advisors = await payload.find({
      collection: 'advisors',
      where: { status: { equals: 'active' } },
      sort: 'displayOrder',
      limit: 100,
      depth: 1,
    });

    return NextResponse.json(advisors.docs ?? []);
  } catch (error) {
    console.error('Error fetching advisors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch advisors' },
      { status: 500 }
    );
  }
}

import client from '@/data/sanity/client';
import { groq } from 'next-sanity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const res = await client.fetch(
      groq`
      *[_type == 'contact' && comp_name != null]{
    ...,
        'comp_logo' : mainImage.asset->url,
        'pageheader': pageheader.asset->url,
      }
      `
    );

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
  }
}

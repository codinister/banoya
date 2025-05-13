'use client'

import { NextStudio } from 'next-sanity/studio';
import config from '@/data/sanity/config';
export default function AdminPage() {
  return <NextStudio config={config} />;
}

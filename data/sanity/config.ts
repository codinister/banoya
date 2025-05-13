'use client'

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
const id = process.env.NEXT_PUBLIC_PROJECT_ID || '';
export default defineConfig({
  projectId: id,
  dataset: 'production',
  apiVersion: '2024-12-10',
  basePath: '/adminpage', 
  title: 'Nak Collections',
  schema: {
    types: schemaTypes
  }, 
  plugins: [structureTool()]
});

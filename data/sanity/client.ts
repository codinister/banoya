import { createClient } from "next-sanity";


export default createClient(
  {
    projectId: process.env.NEXT_PROJECT_ID, 
    dataset: 'production', 
    apiVersion: '2024-12-10', 
    useCdn: true
  }
)
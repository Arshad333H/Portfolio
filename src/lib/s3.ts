// lib/s3.ts
import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.TIGRIS_S3_REGION || 'auto',
  endpoint: process.env.TIGRIS_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.TIGRIS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.TIGRIS_S3_SECRET_KEY!,
  },
  forcePathStyle: true,
});

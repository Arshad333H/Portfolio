// app/api/upload-url/route.ts
import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '@/lib/s3';

export async function POST(req: Request) {
  const { fileName, fileType } = await req.json();

  const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, '-')}`;

  const command = new PutObjectCommand({
    Bucket: process.env.TIGRIS_S3_BUCKET,
    Key: key,
    ContentType: fileType,
    ACL: 'public-read',
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 });

  return NextResponse.json({ url, key });
}

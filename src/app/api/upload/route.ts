// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.TIGRIS_S3_REGION || 'auto',
  endpoint: process.env.TIGRIS_S3_ENDPOINT || 'https://t3.storage.dev',
  credentials: {
    accessKeyId: process.env.TIGRIS_S3_ACCESS_KEY || '',
    secretAccessKey: process.env.TIGRIS_S3_SECRET_KEY || '',
  },
  forcePathStyle: true,
});

export async function POST(request: Request) {
  try {
    // 1. Get FormData (not JSON)
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // 2. Process file upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `uploads/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.TIGRIS_S3_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    }));

    const fileUrl = `${process.env.TIGRIS_S3_ENDPOINT}/${process.env.TIGRIS_S3_BUCKET}/${fileName}`;
    
    return NextResponse.json({
      success: true,
      url: fileUrl,
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};
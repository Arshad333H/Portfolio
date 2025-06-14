import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const dynamic = 'force-dynamic';

const s3 = new S3Client({
  region: process.env.TIGRIS_S3_REGION!,
  endpoint: process.env.TIGRIS_S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.TIGRIS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.TIGRIS_S3_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const videoFile = form.get('file') as File;

    if (!videoFile) {
      return NextResponse.json({ error: 'Video file is missing' }, { status: 400 });
    }

    // Check file size (100MB max)
    if (videoFile.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 100MB limit' }, { status: 400 });
    }

    const buffer = Buffer.from(await videoFile.arrayBuffer());
    const uniqueName = `video-${Date.now()}-${videoFile.name.replace(/\s+/g, '-')}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.TIGRIS_S3_BUCKET!,
      Key: uniqueName,
      Body: buffer,
      ContentType: videoFile.type,
      ACL: 'public-read',
    });

    await s3.send(uploadCommand);

    const fileUrl = `${process.env.TIGRIS_S3_ENDPOINT}/${process.env.TIGRIS_S3_BUCKET}/${uniqueName}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Video upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
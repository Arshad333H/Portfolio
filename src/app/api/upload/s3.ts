import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  tls: true,
  region: process.env.TIGRIS_S3_REGION || "auto",
  endpoint: process.env.TIGRIS_S3_ENDPOINT || "https://t3.storage.dev",
  credentials: {
    accessKeyId: process.env.TIGRIS_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.TIGRIS_S3_SECRET_KEY || "",
  },
  requestHandler: {
    tls: {
      rejectUnauthorized: true, // Enforces SSL cert validation
    },
    forcePathStyle: true,
  },
});

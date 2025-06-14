async function uploadFileToS3(file: File) {
  // Step 1: Request a signed URL
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  const { url, publicUrl } = await res.json();

  // Step 2: Upload file directly to S3
  const upload = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!upload.ok) {
    throw new Error("Upload to S3 failed");
  }

  return publicUrl; // You can now use/display this file
}

/** S3 PUT 업로드 */
export async function uploadToS3(
  uploadUrl: string,
  body: Blob | File
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    body,
    headers: { 'Content-Type': 'image/webp' },
  });
  if (!res.ok) throw new Error('S3 upload failed');
}

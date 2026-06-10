/** base64 문자열 → Blob 변환 */
export function base64ToBlob(base64: string): Blob {
  const [header, data] = base64.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1] ?? 'image/webp';
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

/** 이미지 → webp Blob 변환 (미지원 브라우저는 원본 반환) */
export function convertToWebp(source: File | Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(source);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d')!.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) {
            resolve(source);
            return;
          }
          resolve(blob.type === 'image/webp' ? blob : source);
        },
        'image/webp',
        0.85
      );
    };

    img.onerror = () => reject(new Error('이미지 로드 실패'));
    img.src = url;
  });
}

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

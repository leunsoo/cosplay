import { convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getMeetupPresignedUrl } from '@/shared/api/endpoints/meetup';

// 썸네일 업로드: 데모 모드는 로컬 미리보기 URL, 실제 모드는 presigned URL로 S3 업로드
export async function uploadThumbnail(file: File): Promise<string> {
  if (IS_DEMO) {
    return URL.createObjectURL(file);
  }

  const res = await getMeetupPresignedUrl('thumbnail.webp');
  const { uploadUrl, imageUrl } = res.data;
  const webp = await convertToWebp(file);
  await uploadToS3(uploadUrl, webp);
  return imageUrl;
}

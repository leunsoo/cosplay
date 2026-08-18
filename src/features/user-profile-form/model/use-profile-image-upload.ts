import { useEffect, useRef, useState } from 'react';
import { generateProfileImageUploadUrl } from '@/shared/api/user';
import { convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/isDemo';

const revokePreviewUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

export function useProfileImageUpload(initialImageUri: string) {
  const [imageUri, setImageUri] = useState(initialImageUri);
  const fileRef = useRef<File | null>(null);

  useEffect(() => {
    return () => {
      revokePreviewUrl(imageUri);
    };
  }, [imageUri]);

  const selectFile = (file: File) => {
    revokePreviewUrl(imageUri);
    fileRef.current = file;
    setImageUri(URL.createObjectURL(file));
  };

  const removeFile = () => {
    revokePreviewUrl(imageUri);
    fileRef.current = null;
    setImageUri('');
  };

  const reset = (nextImageUri: string) => {
    revokePreviewUrl(imageUri);
    fileRef.current = null;
    setImageUri(nextImageUri);
  };

  const upload = async (): Promise<string> => {
    const file = fileRef.current;
    if (!file) {
      return imageUri;
    }

    if (IS_DEMO) {
      // 데모 모드: 실제 업로드 없이 이미 만들어둔 로컬 미리보기 URL을 그대로 사용
      return imageUri;
    }

    const webp = await convertToWebp(file);
    const uploadUrlRes = await generateProfileImageUploadUrl({
      filename: file.name,
    });
    const { uploadUrl, imageUrl } = uploadUrlRes.data;
    await uploadToS3(uploadUrl, webp);

    return imageUrl;
  };

  return { imageUri, selectFile, removeFile, reset, upload };
}

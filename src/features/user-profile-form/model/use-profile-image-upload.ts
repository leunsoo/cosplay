import { useEffect, useRef, useState } from 'react';
import { generateProfileImageUploadUrl } from '@/shared/api/endpoints/user';
import { convertToWebp, blobToBase64 } from '@/shared/lib/image-format';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/is-demo';

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
      // 데모 모드: 실제 업로드 없이 base64 data URL로 변환해 사용.
      // blob: URL은 이 훅이 언마운트되면(페이지 이동 등) 자동으로 해제되어
      // "저장된" 값으로 영구 사용할 수 없다 — data: URL은 해제 개념이 없어 안전하다.
      return blobToBase64(file);
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

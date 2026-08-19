import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';

export interface ProfileImageUploadUrlBody {
  filename: string;
}

export const ProfileImageUploadUrlResponseSchema = z.object({
  uploadUrl: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type ProfileImageUploadUrlResponse = z.infer<
  typeof ProfileImageUploadUrlResponseSchema
>;

export const generateProfileImageUploadUrl = async (
  body: ProfileImageUploadUrlBody
): Promise<ApiResponse<ProfileImageUploadUrlResponse>> => {
  if (IS_DEMO) {
    // 데모 모드에서는 실제 업로드 대상이 없으므로 호출부에서 URL.createObjectURL로 대체한다.
    // 이 함수 자체는 호출되지 않아야 하지만, 안전하게 빈 값을 반환한다.
    return {
      status: 'SUCCESS',
      message: '성공',
      data: { uploadUrl: '', imageUrl: '' },
    };
  }

  return apiClient.postWithValidation(
    '/api/v1/user/profile-image-upload-url',
    ProfileImageUploadUrlResponseSchema,
    body
  );
};

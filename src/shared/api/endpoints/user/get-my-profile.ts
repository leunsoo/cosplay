import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMyProfile } from '@/mocks';
import { GenderSchema } from './gender';

export const UserProfileDTOSchema = z.object({
  uuid: z.string().min(1).nullable().optional(),
  nickname: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  gender: GenderSchema.nullable().optional(),
  phone: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  profileImageUri: z.string().nullable().optional(),
  introduction: z.string().nullable().optional(),
  socialLink: z.string().nullable().optional(),
});

export type UserProfileDTO = z.infer<typeof UserProfileDTOSchema>;

interface GetMyProfileParams {
  uuid: string;
}

export const getMyProfile = async (
  params: GetMyProfileParams
): Promise<ApiResponse<UserProfileDTO>> => {
  if (IS_DEMO)
    // mockMyProfile을 그대로 반환하면 업데이트 시 같은 참조를 제자리에서 mutate하기
    // 때문에, React Query의 구조적 공유가 "변경 없음"으로 판단해 캐시를 갱신하지
    // 않는다. 매 호출마다 새 객체로 복사해 반환한다.
    return { status: 'SUCCESS', message: '성공', data: { ...mockMyProfile } };

  return apiClient.getWithValidation(
    `/api/v1/user/${params.uuid}`,
    UserProfileDTOSchema
  );
};

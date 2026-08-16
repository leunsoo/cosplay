'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoMyProfile } from '@/mocks';
import { USER_QUERIES, type Gender } from '@/shared/api/user';
import type { UserProfileFormValues } from '@/features/user-profile-form';
import { mapUserProfileFormModelToUpdateBody } from './mapper';

interface UpdateMyProfileVariables {
  draftInfo: UserProfileFormValues;
  uploadProfileImage: () => Promise<string>;
}

// my-info의 프로필 수정 요청 바디 형태 (updateMyProfile이 실제로 기대하는 형태)
export interface UpdateMyProfileBody {
  uuid: string;
  nickname: string;
  name?: string | null;
  gender?: Gender | null;
  phone?: string | null;
  birthDate?: string | null;
  email?: string | null;
  profileImageUri: string | null;
  introduction: string | null;
  socialLink: string | null;
  removeProfileImage: boolean;
}

const updateMyProfile = async (
  body: UpdateMyProfileBody
): Promise<ApiResponse<unknown>> => {
  if (IS_DEMO) {
    updateDemoMyProfile({
      nickname: body.nickname,
      name: body.name,
      gender: body.gender,
      phone: body.phone,
      birthDate: body.birthDate,
      email: body.email,
      profileImageUri: body.removeProfileImage ? null : body.profileImageUri,
      introduction: body.introduction,
      socialLink: body.socialLink,
    });
    return { status: 'SUCCESS', message: '성공', data: null };
  }

  return apiClient.patch('/api/v1/user', body);
};

export function useUpdateMyProfile(userUuid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      draftInfo,
      uploadProfileImage,
    }: UpdateMyProfileVariables) => {
      const profileImageUri = await uploadProfileImage();

      return updateMyProfile(
        mapUserProfileFormModelToUpdateBody(
          { ...draftInfo, profileImageUri },
          userUuid
        )
      );
    },
    onSuccess: () => {
      alert('프로필이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: USER_QUERIES.myProfiles() });
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
}

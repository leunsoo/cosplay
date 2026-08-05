'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERIES, updateMyProfile } from '@/shared/api/user';
import {
  mapUserProfileFormModelToUpdateBody,
  type UserProfileFormValues,
} from '@/features/user-profile-form';

interface UpdateMyProfileVariables {
  draftInfo: UserProfileFormValues;
  uploadProfileImage: () => Promise<string>;
}

export function useUpdateMyProfile(userUuid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      draftInfo,
      uploadProfileImage,
    }: UpdateMyProfileVariables) => {
      const profileImageUri = await uploadProfileImage();

      return updateMyProfile({
        body: mapUserProfileFormModelToUpdateBody(
          { ...draftInfo, profileImageUri },
          userUuid
        ),
      });
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

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '@/shared/auth';
import {
  type UserProfileFormValues,
  useProfileImageUpload,
} from '@/features/user-profile-form';
import { mapMyProfileDTOToUserProfileFormModel } from '../api/mapper';
import { useMyProfile } from '../api/use-my-profile';
import { useUpdateMyProfile } from '../api/use-update-my-profile';
import { useDeleteMyAccount } from '../api/use-delete-my-account';

const EMPTY_USER_INFO: UserProfileFormValues = {
  nickname: '',
  name: '',
  gender: 'WOMAN',
  phone: '',
  birthDate: '',
  email: '',
  profileImageUri: '',
  introduction: '',
  removeProfileImage: false,
};

export function useMyProfileEditor() {
  const userUuid = useAuthStore((state) => state.userUuid);

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftInfo, setDraftInfo] =
    useState<UserProfileFormValues>(EMPTY_USER_INFO);
  const profileImage = useProfileImageUpload('');

  const myProfileQuery = useMyProfile(userUuid);
  const updateProfileMutation = useUpdateMyProfile(userUuid);
  const deleteAccountMutation = useDeleteMyAccount(userUuid);

  useEffect(() => {
    if (myProfileQuery.isError) {
      console.error('내 정보 조회 에러:', myProfileQuery.error);
    }
  }, [myProfileQuery.isError, myProfileQuery.error]);

  const currentProfile = useMemo(
    () =>
      myProfileQuery.data
        ? mapMyProfileDTOToUserProfileFormModel(myProfileQuery.data.data)
        : EMPTY_USER_INFO,
    [myProfileQuery.data]
  );

  const updateDraftInfo = <K extends keyof UserProfileFormValues>(
    key: K,
    value: UserProfileFormValues[K]
  ) => {
    setDraftInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartEdit = () => {
    profileImage.reset(currentProfile.profileImageUri);
    setDraftInfo(currentProfile);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    profileImage.reset(currentProfile.profileImageUri);
    setDraftInfo(currentProfile);
    setIsEditMode(false);
  };

  const handleSave = () => {
    if (!userUuid) {
      alert('사용자 UUID 정보가 없습니다.');
      return;
    }

    updateProfileMutation.mutate(
      { draftInfo, uploadProfileImage: profileImage.upload },
      { onSuccess: () => setIsEditMode(false) }
    );
  };

  const handleWithdraw = () => {
    const isConfirmed = confirm(
      '정말 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );
    if (!isConfirmed) {
      return;
    }

    deleteAccountMutation.mutate();
  };

  const handleImageSelect = (file: File) => {
    profileImage.selectFile(file);
    updateDraftInfo('removeProfileImage', false);
  };

  const handleImageRemove = () => {
    profileImage.removeFile();
    updateDraftInfo('removeProfileImage', true);
  };

  return {
    isLoading: myProfileQuery.isLoading,
    isError: myProfileQuery.isError,
    isEditMode,
    values: isEditMode
      ? { ...draftInfo, profileImageUri: profileImage.imageUri }
      : currentProfile,
    isSaving: updateProfileMutation.isPending,
    isDeleting: deleteAccountMutation.isPending,
    onFieldChange: updateDraftInfo,
    onImageSelect: handleImageSelect,
    onImageRemove: handleImageRemove,
    onStartEdit: handleStartEdit,
    onCancelEdit: handleCancelEdit,
    onSave: handleSave,
    onWithdraw: handleWithdraw,
  };
}

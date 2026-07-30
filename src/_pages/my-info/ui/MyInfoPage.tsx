'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '@/shared/routes';
import {
  deleteMyAccount,
  generateProfileImageUploadUrl,
  getMyProfile,
  updateMyProfile,
} from '@/shared/api/user';
import { useAuthStore } from '@/shared/store/authStore';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  type UserProfileFormValues,
  UserProfileFormFields,
  mapMyProfileDTOToUserProfileFormModel,
  mapUserProfileFormModelToUpdateBody,
} from '@/features/user-profile-form';
import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';
import { MyInfoMobileMenu } from './MyInfoMobileMenu';

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

const revokePreviewUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

export function MyInfoPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftInfo, setDraftInfo] =
    useState<UserProfileFormValues>(EMPTY_USER_INFO);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const myProfileQuery = useQuery({
    queryKey: ['my-profile', userUuid],
    queryFn: () => getMyProfile({ uuid: userUuid }),
    enabled: userUuid.length > 0,
  });

  const currentProfile = useMemo(
    () =>
      myProfileQuery.data
        ? mapMyProfileDTOToUserProfileFormModel(myProfileQuery.data.data)
        : EMPTY_USER_INFO,
    [myProfileQuery.data]
  );

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      let nextProfileImageUrl = draftInfo.profileImageUri;

      if (profileImageFile) {
        if (IS_DEMO) {
          // 데모 모드: 실제 업로드 없이 이미 만들어둔 로컬 미리보기 URL을 그대로 사용
          nextProfileImageUrl = draftInfo.profileImageUri;
        } else {
          const uploadUrlRes = await generateProfileImageUploadUrl({
            filename: profileImageFile.name,
          });
          const { uploadUrl, imageUrl } = uploadUrlRes.data;
          const uploadRes = await fetch(uploadUrl, {
            method: 'PUT',
            body: profileImageFile,
            headers: {
              'Content-Type':
                profileImageFile.type || 'application/octet-stream',
            },
          });

          if (!uploadRes.ok) {
            throw new Error('Failed to upload profile image');
          }

          nextProfileImageUrl = imageUrl;
        }
      }

      return updateMyProfile({
        body: mapUserProfileFormModelToUpdateBody(
          {
            ...draftInfo,
            profileImageUri: nextProfileImageUrl,
            removeProfileImage: profileImageFile
              ? false
              : draftInfo.removeProfileImage,
          },
          userUuid
        ),
      });
    },
    onSuccess: () => {
      alert('프로필이 수정되었습니다.');
      setProfileImageFile(null);
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['my-profile', userUuid] });
    },
    onError: (error) => {
      console.error('프로필 수정 실패:', error);
      alert('프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => deleteMyAccount({ uuid: userUuid }),
    onSuccess: () => {
      setUnauthenticated();
      alert('회원 탈퇴가 완료되었습니다.');
      router.push(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const updateDraftInfo = <K extends keyof UserProfileFormValues>(
    key: K,
    value: UserProfileFormValues[K]
  ) => {
    setDraftInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleStartEdit = () => {
    setProfileImageFile(null);
    setDraftInfo(currentProfile);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    revokePreviewUrl(draftInfo.profileImageUri);
    setProfileImageFile(null);
    setDraftInfo(currentProfile);
    setIsEditMode(false);
  };

  const handleSave = () => {
    if (!userUuid) {
      alert('사용자 UUID 정보가 없습니다.');
      return;
    }
    updateProfileMutation.mutate();
  };

  useEffect(() => {
    return () => {
      revokePreviewUrl(draftInfo.profileImageUri);
    };
  }, [draftInfo.profileImageUri]);

  const handleWithdraw = () => {
    const isConfirmed = confirm(
      '정말 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
    );
    if (!isConfirmed) {
      return;
    }

    deleteAccountMutation.mutate();
  };

  if (myProfileQuery.isLoading) {
    return (
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
          내 정보를 불러오는 중...
        </div>
      </main>
    );
  }

  if (myProfileQuery.isError) {
    console.error('내 정보 조회 에러:', myProfileQuery.error);
    return (
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-600">
          내 정보 조회에 실패했습니다.
        </div>
      </main>
    );
  }

  return (
    <>
      <MobileHeaderCustom
        actions={
          !isEditMode ? (
            <MyInfoMobileMenu
              onEdit={handleStartEdit}
              onWithdraw={handleWithdraw}
            />
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-sm text-gray-600 font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={updateProfileMutation.isPending}
                className="px-3 py-1.5 text-sm bg-black text-white font-bold rounded-lg disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? '저장 중...' : '저장'}
              </button>
            </div>
          )
        }
      />
      <main className="w-full max-w-4xl mx-auto md:px-6 md:py-8">
        <div className="flex flex-col gap-6">
          <UserProfileFormFields
            values={isEditMode ? draftInfo : currentProfile}
            readOnly={!isEditMode}
            onFieldChange={updateDraftInfo}
            onProfileImageChange={(file, previewUrl) => {
              revokePreviewUrl(draftInfo.profileImageUri);
              setProfileImageFile(file);
              setDraftInfo((prev) => ({
                ...prev,
                profileImageUri: previewUrl,
                removeProfileImage: false,
              }));
            }}
            onProfileImageRemove={() => {
              revokePreviewUrl(draftInfo.profileImageUri);
              setProfileImageFile(null);
              setDraftInfo((prev) => ({
                ...prev,
                profileImageUri: '',
                removeProfileImage: true,
              }));
            }}
          />

          <div className="hidden md:flex flex-col sm:flex-row sm:justify-between gap-3">
            <button
              type="button"
              onClick={handleWithdraw}
              disabled={deleteAccountMutation.isPending}
              className="px-5 py-3 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
            >
              {deleteAccountMutation.isPending
                ? '탈퇴 처리 중...'
                : '회원 탈퇴'}
            </button>

            <div className="flex gap-3 justify-end">
              {isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={updateProfileMutation.isPending}
                    className="px-5 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors"
                  >
                    {updateProfileMutation.isPending ? '저장 중...' : '저장'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="px-5 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors"
                >
                  프로필 수정
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

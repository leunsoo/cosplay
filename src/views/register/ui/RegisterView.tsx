'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/core/config';
import {
  generateProfileImageUploadUrl,
  mapUserProfileFormModelToRegisterBody,
  registerUser,
} from '@/entities/user';
import { useAuthStore } from '@/shared/store/authStore';
import {
  type UserProfileFormValues,
  UserProfileFormFields,
} from '@/features/user-profile-form';

const INITIAL_REGISTER_VALUES: UserProfileFormValues = {
  nickname: '',
  name: '',
  gender: 'man',
  phone: '',
  birthDate: '',
  email: '',
  profileImageUrl: '',
  introduction: '',
  removeProfileImage: false,
};

const revokePreviewUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

export function RegisterView() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [formValues, setFormValues] = useState<UserProfileFormValues>(
    INITIAL_REGISTER_VALUES
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const registerMutation = useMutation({
    mutationFn: async () => {
      let profileImageUrl = '';

      if (profileImageFile) {
        const uploadUrlRes = await generateProfileImageUploadUrl({
          filename: profileImageFile.name,
        });
        const { uploadUrl, imageUrl } = uploadUrlRes.data;
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          body: profileImageFile,
          headers: {
            'Content-Type': profileImageFile.type || 'application/octet-stream',
          },
        });

        if (!uploadRes.ok) {
          throw new Error('Failed to upload profile image');
        }

        profileImageUrl = imageUrl;
      }

      return registerUser({
        body: mapUserProfileFormModelToRegisterBody({
          ...formValues,
          profileImageUrl,
        }),
      });
    },
    onSuccess: (response) => {
      setAuthenticated(response.data.accessToken);
      alert('회원가입이 완료되었습니다.');
      router.push(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const updateFormValue = <K extends keyof UserProfileFormValues>(
    key: K,
    value: UserProfileFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerMutation.mutate();
  };

  useEffect(() => {
    return () => {
      revokePreviewUrl(formValues.profileImageUrl);
    };
  }, [formValues.profileImageUrl]);

  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex mb-6 text-sm font-medium text-gray-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href={ROUTES.HOME}
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
          </li>
          <li className="text-primary font-semibold">회원가입</li>
        </ol>
      </nav>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          CosConnect 회원가입
        </h1>
        <p className="text-gray-600 mt-2">
          아래 정보를 입력하고 코스플레이 커뮤니티를 시작하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <UserProfileFormFields
          values={formValues}
          required
          onFieldChange={updateFormValue}
          onProfileImageChange={(file, previewUrl) => {
            revokePreviewUrl(formValues.profileImageUrl);
            setProfileImageFile(file);
            updateFormValue('profileImageUrl', previewUrl);
          }}
          onProfileImageRemove={() => {
            revokePreviewUrl(formValues.profileImageUrl);
            setProfileImageFile(null);
            updateFormValue('profileImageUrl', '');
          }}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors"
          >
            {registerMutation.isPending ? '가입 처리 중...' : '회원가입 완료'}
          </button>
        </div>
      </form>
    </main>
  );
}

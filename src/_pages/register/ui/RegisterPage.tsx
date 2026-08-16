'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import {
  type UserProfileFormValues,
  UserProfileFormFields,
  useProfileImageUpload,
} from '@/features/user-profile-form';
import { useRegisterUser } from '../api/use-register-user';

const INITIAL_REGISTER_VALUES: UserProfileFormValues = {
  nickname: '',
  name: '',
  gender: 'MAN',
  phone: '',
  birthDate: '',
  email: '',
  profileImageUri: '',
  introduction: '',
  removeProfileImage: false,
};

export function RegisterPage() {
  const [formValues, setFormValues] = useState(INITIAL_REGISTER_VALUES);
  const profileImage = useProfileImageUpload('');
  const registerMutation = useRegisterUser();

  const updateFormValue = <K extends keyof UserProfileFormValues>(
    key: K,
    value: UserProfileFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerMutation.mutate({
      formValues,
      uploadProfileImage: profileImage.upload,
    });
  };

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
          values={{ ...formValues, profileImageUri: profileImage.imageUri }}
          required
          onFieldChange={updateFormValue}
          onImageSelect={profileImage.selectFile}
          onImageRemove={profileImage.removeFile}
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

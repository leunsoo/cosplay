'use client';

import { type ChangeEvent } from 'react';
import { type Gender, type UserProfileFormValues } from '../model/types';
import { formatPhoneKorea, normalizePhone } from '@/shared/lib/formatPhone';
import { UserAvatar } from '@/entities/user';
import { BirthDatePicker } from './BirthDatePicker';

const GENDER_LABELS: Record<Gender, string> = {
  man: '남성',
  woman: '여성',
};

interface UserProfileFormFieldsProps {
  values: UserProfileFormValues;
  readOnly?: boolean;
  required?: boolean;
  onFieldChange: <K extends keyof UserProfileFormValues>(
    key: K,
    value: UserProfileFormValues[K]
  ) => void;
  onProfileImageChange: (file: File, previewUrl: string) => void;
  onProfileImageRemove?: () => void;
}

export function UserProfileFormFields({
  values,
  readOnly = false,
  required = false,
  onFieldChange,
  onProfileImageChange,
  onProfileImageRemove,
}: UserProfileFormFieldsProps) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onProfileImageChange(file, previewUrl);
  };

  return (
    <section className="bg-white md:rounded-2xl py-4 px-4 md:px-8 md:py-8 md:shadow-sm md:border border-gray-100">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
        <span className="material-symbols-outlined text-primary">person</span>
        프로필 정보
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col items-center sm:items-start gap-3">
          <UserAvatar
            avatarUrl={values.profileImageUrl ?? null}
            className="w-28 h-28 border border-gray-200"
          />
          {!readOnly && (
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  photo_camera
                </span>
                프로필 사진 변경
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {values.profileImageUrl && onProfileImageRemove && (
                <button
                  type="button"
                  onClick={onProfileImageRemove}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 bg-white text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                  제거
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              닉네임 {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={values.nickname}
              onChange={(e) => onFieldChange('nickname', e.target.value)}
              disabled={readOnly}
              required={required}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="닉네임을 입력해주세요"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              이름 {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={values.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              disabled={readOnly}
              required={required}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="실명을 입력해주세요"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            성별 {required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex flex-wrap gap-3">
            {(['man', 'woman'] as const).map((gender) => {
              const isSelected = values.gender === gender;
              return (
                <button
                  key={gender}
                  type="button"
                  disabled={readOnly}
                  onClick={() => onFieldChange('gender', gender)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors disabled:cursor-default ${
                    isSelected
                      ? 'border-primary bg-black text-white'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  {GENDER_LABELS[gender]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              휴대폰 번호 {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="tel"
              value={formatPhoneKorea(values.phone)}
              onChange={(e) => {
                const digits = normalizePhone(e.target.value);
                onFieldChange('phone', digits);
              }}
              disabled={readOnly}
              required={required}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="010-1234-5678"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              생년월일 {required && <span className="text-red-500">*</span>}
            </label>
            <BirthDatePicker
              value={values.birthDate}
              onChange={(date) => onFieldChange('birthDate', date)}
              disabled={readOnly}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            이메일 {required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            disabled={readOnly}
            required={required}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            자기소개
          </label>
          <textarea
            value={values.introduction}
            onChange={(e) => onFieldChange('introduction', e.target.value)}
            disabled={readOnly}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            placeholder="자기소개를 입력해주세요"
          />
        </div>
      </div>
    </section>
  );
}

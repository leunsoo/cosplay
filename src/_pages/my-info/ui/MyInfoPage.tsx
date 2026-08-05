'use client';

import { UserProfileFormFields } from '@/features/user-profile-form';
import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';
import { useMyProfileEditor } from '../model/use-my-profile-editor';
import { MyInfoMobileMenu } from './MyInfoMobileMenu';

export function MyInfoPage() {
  const {
    isLoading,
    isError,
    isEditMode,
    values,
    isSaving,
    isDeleting,
    onFieldChange,
    onImageSelect,
    onImageRemove,
    onStartEdit,
    onCancelEdit,
    onSave,
    onWithdraw,
  } = useMyProfileEditor();

  if (isLoading) {
    return (
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
          내 정보를 불러오는 중...
        </div>
      </main>
    );
  }

  if (isError) {
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
            <MyInfoMobileMenu onEdit={onStartEdit} onWithdraw={onWithdraw} />
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onCancelEdit}
                className="px-3 py-1.5 text-sm text-gray-600 font-medium"
              >
                취소
              </button>
              <button
                onClick={onSave}
                disabled={isSaving}
                className="px-3 py-1.5 text-sm bg-black text-white font-bold rounded-lg disabled:opacity-50"
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
            </div>
          )
        }
      />
      <main className="w-full max-w-4xl mx-auto md:px-6 md:py-8">
        <div className="flex flex-col gap-6">
          <UserProfileFormFields
            values={values}
            readOnly={!isEditMode}
            onFieldChange={onFieldChange}
            onImageSelect={onImageSelect}
            onImageRemove={onImageRemove}
          />

          <div className="hidden md:flex flex-col sm:flex-row sm:justify-between gap-3">
            <button
              type="button"
              onClick={onWithdraw}
              disabled={isDeleting}
              className="px-5 py-3 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors"
            >
              {isDeleting ? '탈퇴 처리 중...' : '회원 탈퇴'}
            </button>

            <div className="flex gap-3 justify-end">
              {isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="px-5 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors"
                  >
                    {isSaving ? '저장 중...' : '저장'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onStartEdit}
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

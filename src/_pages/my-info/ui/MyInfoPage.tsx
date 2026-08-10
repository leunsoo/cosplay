'use client';

import { LoadingState, ErrorState } from '@/shared/ui';
import { UserProfileFormFields } from '@/features/user-profile-form';
import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';
import { useMyProfileEditor } from '../model/use-my-profile-editor';
import { MyInfoMobileMenu } from './MyInfoMobileMenu';
import { EditActions } from './EditActions';

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
    return <LoadingState message="내 정보를 불러오는 중..." />;
  }

  if (isError) {
    return <ErrorState message="내 정보 조회에 실패했습니다." />;
  }

  return (
    <>
      <MobileHeaderCustom
        actions={
          !isEditMode ? (
            <MyInfoMobileMenu onEdit={onStartEdit} onWithdraw={onWithdraw} />
          ) : (
            <div className="flex items-center gap-2">
              <EditActions
                variant="mobile"
                onCancel={onCancelEdit}
                onSave={onSave}
                isSaving={isSaving}
              />
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
                <EditActions
                  variant="desktop"
                  onCancel={onCancelEdit}
                  onSave={onSave}
                  isSaving={isSaving}
                />
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

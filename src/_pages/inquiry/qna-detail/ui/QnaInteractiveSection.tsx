'use client';

import type { ReactNode } from 'react';
import { ROUTES } from '@/shared/routes';
import { BackLink } from '@/shared/ui';
import { useMyProfile } from '@/entities/user';
import { MobileHeaderCustom } from '@/widgets/mobile-header';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { useQnaEditForm } from '../model/use-qna-edit-form';
import { useQnaDelete } from '../model/use-qna-delete';
import { QnaContent } from './QnaContent';
import { QnaMobileMenu } from './QnaMobileMenu';
import type { QnaEditActions } from './qna-edit-actions';

interface QnaInteractiveSectionProps {
  post: QnaDetail;
  qnaPostId: number;
  // 답변 섹션은 수정 불가능한 정적 콘텐츠라 서버(QnaDetailPage)가 미리 렌더링해서
  // 넘겨준다 — 이 컴포넌트가 client여도 answerSection 자체는 서버 렌더링을 유지한다.
  answerSection: ReactNode;
}

// 헤더 액션 슬롯(모바일 케밥 메뉴)과 질문 카드가 같은 수정 상태를 공유해야 해서,
// 이 둘을 함께 소유하는 client 컴포넌트로 묶었다.
export function QnaInteractiveSection({
  post,
  qnaPostId,
  answerSection,
}: QnaInteractiveSectionProps) {
  const { data: profileData } = useMyProfile();
  const editForm = useQnaEditForm(post, qnaPostId);
  const { isDeleting, remove: handleDelete } = useQnaDelete(qnaPostId);

  const myNickname = profileData?.data?.nickname ?? null;
  const isMyPost = !!(myNickname && post.inquirer === myNickname);

  const actions: QnaEditActions = {
    isEditing: editForm.isEditing,
    isUpdating: editForm.isUpdating,
    canSave: editForm.canSave,
    onEdit: editForm.start,
    onSave: editForm.save,
    onCancel: editForm.cancel,
    isDeleting,
    onDelete: handleDelete,
  };

  return (
    <>
      <MobileHeaderCustom
        actions={isMyPost ? <QnaMobileMenu {...actions} /> : undefined}
      />
      <main className="container-custom pt-2 md:pt-8 pb-20">
        <BackLink href={ROUTES.COMMUNITY.LIST} />

        <div className="space-y-4">
          <QnaContent
            post={post}
            isMyPost={isMyPost}
            actions={actions}
            editTitle={editForm.title}
            editContent={editForm.content}
            onTitleChange={editForm.onTitleChange}
            onContentChange={editForm.onContentChange}
          />
          {answerSection}
        </div>
      </main>
    </>
  );
}

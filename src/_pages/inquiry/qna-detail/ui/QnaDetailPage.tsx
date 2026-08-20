'use client';

import { ROUTES } from '@/shared/routes';
import { LoadingState, NotFoundState, BackLink } from '@/shared/ui';
import { useMyProfile } from '@/entities/user';
import { MobileHeaderCustom } from '@/widgets/mobile-header';
import { useQnaDetail } from '../api/use-qna-detail';
import { useQnaEditForm } from '../model/use-qna-edit-form';
import { useQnaDelete } from '../model/use-qna-delete';
import { QnaContent } from './QnaContent';
import { QnaMobileMenu } from './QnaMobileMenu';
import type { QnaEditActions } from './qna-edit-actions';

interface QnaDetailPageProps {
  qnaPostId: number;
}

export function QnaDetailPage({ qnaPostId }: QnaDetailPageProps) {
  const { post, isLoading, error } = useQnaDetail(qnaPostId);
  const editForm = useQnaEditForm(post, qnaPostId);
  const { isDeleting, remove: handleDelete } = useQnaDelete(qnaPostId);
  const { data: profileData } = useMyProfile();

  const myNickname = profileData?.data?.nickname ?? null;
  const isMyPost = !!(myNickname && post?.inquirer === myNickname);

  if (isLoading) {
    return <LoadingState message="게시글을 불러오는 중..." />;
  }

  if (error || !post) {
    return (
      <NotFoundState
        title="게시글을 찾을 수 없습니다"
        backHref={ROUTES.COMMUNITY.LIST}
      />
    );
  }

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

        <QnaContent
          post={post}
          isMyPost={isMyPost}
          actions={actions}
          editTitle={editForm.title}
          editContent={editForm.content}
          onTitleChange={editForm.onTitleChange}
          onContentChange={editForm.onContentChange}
        />
      </main>
    </>
  );
}

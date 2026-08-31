'use client';

import { useRouter } from 'next/navigation';
import { useIsMyNickname } from '@/entities/user';
import { ROUTES } from '@/shared/routes';
import { useQnaDetail } from '../api/use-qna-detail';
import { useUpdateQna } from '../api/use-update-qna';
import { QnaForm } from './QnaForm';

interface QnaEditPageProps {
  qnaPostId: number;
}

export function QnaEditPage({ qnaPostId }: QnaEditPageProps) {
  const router = useRouter();
  const { post, isLoading, error } = useQnaDetail(qnaPostId);
  const { mutate: submitPost, isPending } = useUpdateQna(qnaPostId);
  const isMyPost = useIsMyNickname(post?.inquirer);

  if (isLoading) {
    return <div className="container-custom pt-8 text-center">로딩 중...</div>;
  }

  if (error || !post) {
    return (
      <div className="container-custom pt-8 text-center">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  // 본인 글이 아니면 접근 차단 (ProductEditPage와 동일 패턴)
  if (!isMyPost) {
    router.replace(ROUTES.COMMUNITY.QNA_DETAIL(qnaPostId));
    return null;
  }

  return (
    <QnaForm
      defaultValues={{ title: post.title, content: post.content }}
      onSubmit={submitPost}
      isPending={isPending}
      isEditMode
      cancelHref={ROUTES.COMMUNITY.QNA_DETAIL(qnaPostId)}
    />
  );
}

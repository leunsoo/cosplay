'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/shared/routes';
import { LoadingState, NotFoundState, BackLink } from '@/shared/ui';
import { useAuthStore } from '@/shared/store/authStore';
import { useLogined } from '@/entities/auth';
import { getMyProfile } from '@/shared/api/user';
import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';
import { useQnaDetail } from '../api/use-qna-detail';
import { useDeleteQna } from '../api/use-delete-qna';
import { useUpdateQna } from '../api/use-update-qna';
import { QnaContent } from './QnaContent';
import { QnaMobileMenu } from './QnaMobileMenu';

interface QnaDetailPageProps {
  qnaPostId: number;
}

export function QnaDetailPage({ qnaPostId }: QnaDetailPageProps) {
  const isLogined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  const [isEditing, setIsEditing] = useState(false);

  const { post, isLoading, error } = useQnaDetail(qnaPostId);
  const { mutate: deletePost, isPending: isDeleting } = useDeleteQna();
  const { mutate: updatePost, isPending: isUpdating } = useUpdateQna(qnaPostId);

  const { data: profileData } = useQuery({
    queryKey: ['my-profile', userUuid],
    queryFn: () => getMyProfile({ uuid: userUuid }),
    enabled: isLogined && !!userUuid,
    staleTime: Infinity,
  });

  const myNickname = profileData?.data?.nickname ?? null;
  const isMyPost = !!(myNickname && post?.inquirer === myNickname);

  const handleDelete = () => {
    if (!confirm('질문을 삭제하시겠습니까?')) return;
    deletePost(qnaPostId);
  };

  const handleUpdate = (data: { title: string; content: string }) => {
    updatePost(data);
  };

  const handleSave = () => setIsEditing(false);

  const handleCancel = () => setIsEditing(false);

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

  return (
    <>
      <MobileHeaderCustom
        actions={
          isMyPost ? (
            <QnaMobileMenu
              isEditing={isEditing}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
            />
          ) : undefined
        }
      />
      <main className="container-custom pt-2 md:pt-8 pb-20">
        <BackLink href={ROUTES.COMMUNITY.LIST} />

        <QnaContent
          post={post}
          isMyPost={isMyPost}
          onDelete={handleDelete}
          isDeleting={isDeleting}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </main>
    </>
  );
}

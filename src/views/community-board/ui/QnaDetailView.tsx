'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/core/config/routes';
import { useAuthStore } from '@/shared/store/authStore';
import { useLogined } from '@/entities/auth';
import { getMyProfile } from '@/entities/user';
import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';
import { useQnaPost } from '../model/hooks/useQnaPost';
import {
  useDeleteQnaPost,
  useUpdateQnaPost,
} from '../model/hooks/useQnaMutations';
import { QnaContent } from './components/QnaContent';
import { QnaMobileMenu } from './components/QnaMobileMenu';

interface QnaDetailViewProps {
  qnaPostId: number;
}

export function QnaDetailView({ qnaPostId }: QnaDetailViewProps) {
  const isLogined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  const [isEditing, setIsEditing] = useState(false);

  const { post, isLoading, error } = useQnaPost(qnaPostId);
  const { mutate: deletePost, isPending: isDeleting } = useDeleteQnaPost();
  const { mutate: updatePost, isPending: isUpdating } =
    useUpdateQnaPost(qnaPostId);

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            게시글을 찾을 수 없습니다
          </h1>
          <Link
            href={ROUTES.COMMUNITY.LIST}
            className="text-primary hover:underline"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
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
        <Link
          href={ROUTES.COMMUNITY.LIST}
          className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 w-fit"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          목록으로
        </Link>

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

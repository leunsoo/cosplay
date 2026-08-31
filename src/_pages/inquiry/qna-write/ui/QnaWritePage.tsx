'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { useLogined } from '@/shared/auth';
import { useCreateQna } from '../api/use-create-qna';
import { QnaForm } from './QnaForm';

export function QnaWritePage() {
  const isLogined = useLogined();
  const router = useRouter();
  const { mutate: submitPost, isPending } = useCreateQna();

  useEffect(() => {
    if (!isLogined) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLogined, router]);

  return (
    <QnaForm
      onSubmit={submitPost}
      isPending={isPending}
      isEditMode={false}
      cancelHref={ROUTES.COMMUNITY.LIST}
    />
  );
}

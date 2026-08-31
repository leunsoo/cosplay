'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/shared/ui';
import { ROUTES } from '@/shared/routes';

export default function QnaDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      icon="error"
      message="게시글 정보를 불러오지 못했습니다."
      description="잠시 후 다시 시도해주세요."
      onRetry={() => reset()}
      backHref={ROUTES.COMMUNITY.LIST}
    />
  );
}

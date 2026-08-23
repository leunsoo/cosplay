'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserRound } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

const SIZE_MAP = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-32 h-32',
} as const;

const INITIAL_TEXT_SIZE_MAP = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-4xl',
} as const;

const SHAPE_MAP = {
  circle: 'rounded-full',
  rectangle: 'rounded-sm',
} as const;

interface UserAvatarProps {
  avatarUrl: string | null;
  /** 실제 사용자 이름 — alt 텍스트와 이니셜 fallback을 여기서 자동으로 만든다. */
  name?: string;
  size?: keyof typeof SIZE_MAP;
  shape?: keyof typeof SHAPE_MAP;
  /** 배치(레이아웃)용 이스케이프 해치로만 사용 — 색/모양/크기는 size·shape prop으로. */
  className?: string;
}

export function UserAvatar({
  avatarUrl,
  name,
  size = 'md',
  shape = 'circle',
  className,
}: UserAvatarProps) {
  // avatarUrl이 바뀌면 새 URL과 비교가 달라지므로 실패 상태가 자연히 리셋된다.
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const showImage = avatarUrl && avatarUrl !== failedUrl;
  const altText = name ? `${name}님의 프로필 사진` : '프로필 이미지';
  const initial = name?.trim().charAt(0).toUpperCase();

  let content;
  if (showImage) {
    // 실패 시 onError가 failedUrl을 채워 자동으로 다음 분기(이니셜/아이콘)로 전환된다.
    content = (
      <Image
        src={avatarUrl}
        alt={altText}
        fill
        className="object-cover"
        onError={() => setFailedUrl(avatarUrl)}
      />
    );
  } else if (initial) {
    // 이미지는 없어도 이름은 있는 경우 — 아이콘 대신 이니셜로 사용자를 구분되게 표시.
    // 눈에 보이는 텍스트라 스크린 리더가 자연스럽게 읽지만, "OOO님의 프로필 사진"까지
    // 전달하기 위해 role/aria-label을 이 요소 자신에게 직접 준다.
    content = (
      <span
        className={cn(
          'font-semibold text-gray-500',
          INITIAL_TEXT_SIZE_MAP[size]
        )}
        role="img"
        aria-label={altText}
      >
        {initial}
      </span>
    );
  } else {
    // 아이콘 자신에게 직접 라벨을 준다 — wrapper를 거치지 않는다.
    content = (
      <UserRound
        className="w-1/2 h-1/2 text-gray-400"
        role="img"
        aria-label={altText}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative bg-gray-100 flex items-center justify-center overflow-hidden',
        SIZE_MAP[size],
        SHAPE_MAP[shape],
        className
      )}
    >
      {content}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const FALLBACK_SRC = '/placeholder.png';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null | undefined;
}

// next/image 사용처에서 원본 이미지가 없거나(null/undefined) 로드가
// 실패하면(데모 모드 picsum.photos 503 등) 자동으로 로컬 플레이스홀더로
// 전환한다. UserAvatar가 쓰는 "실패한 src를 기억해서 폴백으로 전환" 패턴을
// 범용으로 뽑아낸 것.
export function ImageWithFallback({
  src,
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = failed || !src ? FALLBACK_SRC : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

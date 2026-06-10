'use client';

import { usePathname } from 'next/navigation';

/**
 * 모바일 반응형이 준비되지 않은 경로 목록.
 * 여기에 추가된 경로는 모바일에서 차단 메시지를 표시합니다.
 */
const MOBILE_BLOCKED_PATHS: string[] = [];

function isMobileReady(pathname: string): boolean {
  return !MOBILE_BLOCKED_PATHS.some((path) => pathname.startsWith(path));
}

export function MobileGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ready = isMobileReady(pathname);

  return (
    <>
      {/* 모바일 차단 레이어 — 모바일 미준비 탭 + md 미만에서만 표시 */}
      {!ready && (
        <div className="flex md:hidden fixed inset-0 z-40 bg-white flex-col items-center justify-center px-8 text-center">
          <h2 className="text-lg font-bold text-text-main mb-3">
            PC 환경을 권장합니다
          </h2>
          <p className="text-sm text-text-sub leading-relaxed">
            현재 페이지는 모바일 환경을 지원하지 않습니다.
            <br />
            PC 환경에서 접속해 주세요.
            <br />
            빠른 시일내로 준비하겠습니다.
          </p>
        </div>
      )}

      {/* 실제 콘텐츠 */}
      {children}
    </>
  );
}

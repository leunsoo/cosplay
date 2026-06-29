import { IS_DEMO } from '@/shared/lib/isDemo';

export function DemoBanner() {
  if (!IS_DEMO) return null;

  return (
    <div className="w-full bg-amber-400 text-amber-950 text-center text-sm font-medium py-2 px-4">
      데모 모드 — 포트폴리오 용으로, 실제 서버 없이 목 데이터로 동작합니다.
      로그인 및 데이터 변경은 지원되지 않습니다.
    </div>
  );
}

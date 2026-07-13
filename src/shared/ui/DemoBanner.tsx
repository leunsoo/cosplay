import { IS_DEMO } from '@/shared/lib/isDemo';

export function DemoBanner() {
  if (!IS_DEMO) return null;

  return (
    <div className="sticky top-0 z-60 w-full h-9 flex items-center justify-center bg-amber-400 text-amber-950 text-center text-sm font-medium px-4">
      포트폴리오 용으로, 데모 모드입니다.
    </div>
  );
}

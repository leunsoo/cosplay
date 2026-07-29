'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/shared/routes';
import { LogoutBtn } from '@/features/logout';
import { useLogined } from '@/entities/auth';
import { UserAvatar, getMyProfile } from '@/entities/user';
import { useAuthStore } from '@/shared/store/authStore';
import { IS_DEMO } from '@/shared/lib/isDemo';

export function MainMenu() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname.includes(path);

  const logined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  const { data: profile } = useQuery({
    queryKey: ['my-profile', userUuid],
    queryFn: () => getMyProfile({ uuid: userUuid }),
    enabled: logined && !!userUuid,
    staleTime: Infinity,
  });

  return (
    <div
      className={`hidden md:block sticky ${
        IS_DEMO ? 'top-9' : 'top-0'
      } z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md`}
    >
      <div className="container-custom mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-8 md:gap-12">
          <Link className="flex items-center gap-2 group" href={ROUTES.HOME}>
            <h1 className="text-slate-900 text-xl font-black tracking-tight">
              LLOWA
            </h1>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              className={`font-medium text-[15px] transition-colors py-5 ${
                isActive(ROUTES.HOME) || isActive(ROUTES.MEETUP.DETAIL(''))
                  ? 'text-slate-900 font-bold border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
              href={ROUTES.HOME}
            >
              행사 일정
            </Link>
            <Link
              className={`font-medium text-[15px] transition-colors py-5 ${
                isActive(ROUTES.MARKET)
                  ? 'text-slate-900 font-bold border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
              href={ROUTES.MARKET}
            >
              코스마켓
            </Link>
            <Link
              className={`font-medium text-[15px] transition-colors py-5 ${
                isActive(ROUTES.COMMUNITY.LIST)
                  ? 'text-slate-900 font-bold border-b-2 border-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
              href={ROUTES.COMMUNITY.LIST}
            >
              문의하기
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3 md:gap-4">
          {logined ? (
            <>
              <Link href={ROUTES.MY_INFO} aria-label="내 정보로 이동">
                <UserAvatar
                  avatarUrl={profile?.data?.profileImageUri ?? null}
                  size="xs"
                  className="border border-gray-200 hover:ring-2 hover:ring-primary transition-all"
                />
              </Link>
              <LogoutBtn className="w-auto px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-transparent hover:text-gray-700 transition-none" />
            </>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

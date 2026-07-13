'use client';

import { useRouter } from 'next/navigation';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { useAuthStore } from '@/shared/store/authStore';
import { ROUTES } from '@/core/config';

type Provider = 'google' | 'kakao' | 'x';

interface LoginBtnProps {
  provider: Provider;
  nextPath?: string | null;
}

const PROVIDER_META = {
  google: {
    label: 'Google로 계속하기',
    defaultPath: '/oauth2/authorization/google-user',
    Icon: GoogleIcon,
    className: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
  },
  kakao: {
    label: 'Kakao로 계속하기',
    defaultPath: '/oauth2/authorization/kakao-user',
    Icon: KakaoIcon,
    className: 'bg-[#FEE500] text-[#191919] hover:bg-[#F2DA00]',
  },
  x: {
    label: 'X로 계속하기',
    defaultPath: '/oauth2/authorization/x-user',
    Icon: XIcon,
    className: 'bg-black text-white hover:bg-gray-800',
  },
} as const;

const LOGIN_NEXT_KEY = 'login_next_path';

export function LoginBtn({ provider, nextPath }: LoginBtnProps) {
  const router = useRouter();
  const setDemoAuthenticated = useAuthStore(
    (state) => state.setDemoAuthenticated
  );
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined;
  const meta = PROVIDER_META[provider];

  const onClick = () => {
    if (IS_DEMO) {
      // 데모 모드: 실제 OAuth 리다이렉트 없이 즉시 인증 상태로 전환
      setDemoAuthenticated();
      router.replace(nextPath?.trim() || ROUTES.HOME);
      return;
    }

    if (!baseURL) {
      alert('API 주소가 설정되지 않았습니다.');
      return;
    }

    const next = nextPath?.trim();
    if (next) {
      sessionStorage.setItem(LOGIN_NEXT_KEY, next);
    } else {
      sessionStorage.removeItem(LOGIN_NEXT_KEY);
    }

    const query = next ? `?next=${encodeURIComponent(next)}` : '';
    const finalAuthUrl = `${baseURL}${meta.defaultPath}${query}`;
    window.location.assign(finalAuthUrl);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors ${meta.className}`}
    >
      <meta.Icon size={20} />
      <span>{meta.label}</span>
    </button>
  );
}

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8055 10.2292C19.8055 9.55156 19.7499 8.86719 19.6305 8.19531H10.2V12.0484H15.6014C15.3775 13.2906 14.6571 14.3896 13.6153 15.0875V17.5863H16.8251C18.7174 15.8449 19.8055 13.2719 19.8055 10.2292Z"
        fill="#4285F4"
      />
      <path
        d="M10.2 20C12.8955 20 15.1712 19.1031 16.8286 17.5863L13.6188 15.0875C12.7361 15.6969 11.5958 16.0438 10.2035 16.0438C7.59291 16.0438 5.38086 14.2833 4.60352 11.9094H1.29688V14.4875C3.00137 17.8714 6.43094 20 10.2 20Z"
        fill="#34A853"
      />
      <path
        d="M4.6 11.9094C4.19824 10.6672 4.19824 9.33594 4.6 8.09375V5.51562H1.29688C-0.173438 8.43594 -0.173438 11.5672 1.29688 14.4875L4.6 11.9094Z"
        fill="#FBBC04"
      />
      <path
        d="M10.2 3.95625C11.6715 3.93437 13.0915 4.47656 14.1612 5.48281L17.0233 2.62031C15.0855 0.792187 12.5146 -0.0546875 10.2 0C6.43094 0 3.00137 2.12656 1.29688 5.51562L4.60352 8.09375C5.37734 5.71562 7.59291 3.95625 10.2 3.95625Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function KakaoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C6.477 3 2 6.58 2 11c0 2.89 1.93 5.42 4.83 6.83-.2.74-.73 2.7-.84 3.12-.14.53.19.52.4.38.17-.11 2.74-1.86 3.85-2.62.58.08 1.17.12 1.76.12 5.523 0 10-3.58 10-8s-4.477-8-10-8Z"
        fill="#191919"
      />
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'currentColor' }}
    >
      <path
        d="M18.9 2H22L14.9 10.1L23.3 22H16.8L11.7 14.9L5.5 22H2.4L10 13.3L2 2H8.7L13.3 8.3L18.9 2ZM17.8 20H19.5L7.8 3.9H6L17.8 20Z"
        fill="currentColor"
      />
    </svg>
  );
}

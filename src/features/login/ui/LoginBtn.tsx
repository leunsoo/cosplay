'use client';

import { useLoginRedirect } from '../model/useLoginRedirect';
import type { LoginProvider } from '../model/loginRedirectStrategy';
import { GoogleIcon } from './GoogleIcon';
import { KakaoIcon } from './KakaoIcon';
import { XIcon } from './XIcon';

interface LoginBtnProps {
  provider: LoginProvider;
  nextPath?: string | null;
}

const PROVIDER_META = {
  google: {
    label: 'Google로 계속하기',
    Icon: GoogleIcon,
    className: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
  },
  kakao: {
    label: 'Kakao로 계속하기',
    Icon: KakaoIcon,
    className: 'bg-[#FEE500] text-[#191919] hover:bg-[#F2DA00]',
  },
  x: {
    label: 'X로 계속하기',
    Icon: XIcon,
    className: 'bg-black text-white hover:bg-gray-800',
  },
} as const;

export function LoginBtn({ provider, nextPath }: LoginBtnProps) {
  const handleClick = useLoginRedirect(provider, nextPath);
  const meta = PROVIDER_META[provider];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors ${meta.className}`}
    >
      <meta.Icon size={20} />
      <span>{meta.label}</span>
    </button>
  );
}

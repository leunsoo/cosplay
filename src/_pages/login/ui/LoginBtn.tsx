'use client';

import type { ComponentType } from 'react';
import { useLoginRedirect } from '../model/use-login-redirect';
import type { LoginProvider } from '../model/login-provider';
import { GoogleIcon } from './GoogleIcon';
import { KakaoIcon } from './KakaoIcon';
import { XIcon } from './XIcon';
import type { IconProps } from './icon-props';

interface LoginBtnProps {
  provider: LoginProvider;
}

interface ProviderMeta {
  label: string;
  Icon: ComponentType<IconProps>;
  className: string;
}

const PROVIDER_META: Record<LoginProvider, ProviderMeta> = {
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
};

export function LoginBtn({ provider }: LoginBtnProps) {
  const handleClick = useLoginRedirect(provider);
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

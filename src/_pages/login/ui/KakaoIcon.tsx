import type { IconProps } from './icon-props';

export function KakaoIcon({ size = 20 }: IconProps) {
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

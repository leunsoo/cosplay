import type { IconProps } from './iconProps';

export function XIcon({ size = 20 }: IconProps) {
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
        d="M18.9 2H22L14.9 10.1L23.3 22H16.8L11.7 14.9L5.5 22H2.4L10 13.3L2 2H8.7L13.3 8.3L18.9 2ZM17.8 20H19.5L7.8 3.9H6L17.8 20Z"
        fill="currentColor"
      />
    </svg>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type ClarityMaskBoundaryProps = {
  children: ReactNode;
};

const SENSITIVE_ROUTE_PATTERNS = [
  /^\/register$/,
  /^\/my-info$/,
  /^\/market\/chat$/,
  /^\/market\/products\/regist$/,
  /^\/market\/products\/[^/]+\/edit$/,
  /^\/meetup\/register$/,
  /^\/meetup\/[^/]+\/edit$/,
];

export function ClarityMaskBoundary({ children }: ClarityMaskBoundaryProps) {
  const pathname = usePathname();
  const shouldMask = SENSITIVE_ROUTE_PATTERNS.some((pattern) =>
    pattern.test(pathname)
  );

  return (
    <main
      className="flex-1 pb-16 md:pb-0"
      data-clarity-mask={shouldMask ? 'True' : undefined}
    >
      {children}
    </main>
  );
}

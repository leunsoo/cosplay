'use client';

import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';
import { MarketMobileMenu } from './MarketMobileMenu';

export function MarketMobileHeader() {
  return <MobileHeaderCustom actions={<MarketMobileMenu />} />;
}

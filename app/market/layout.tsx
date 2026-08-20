import { MarketMenu, MarketMobileMenu } from '@/widgets/market-menu';
import { MarketSideBar } from '@/widgets/market-sidebar';
import { MobileHeaderCustom } from '@/widgets/mobile-header';

export default function CosMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <MobileHeaderCustom actions={<MarketMobileMenu />} />
      <div className="flex flex-col container-custom mx-auto pt-6">
        <MarketMenu />

        {children}
      </div>

      <MarketSideBar />
    </div>
  );
}

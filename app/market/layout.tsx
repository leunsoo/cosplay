import { MarketMenu, MarketMobileHeader } from '@/widgets/market-menu';
import { MarketSideBar } from '@/widgets/market-sidebar';

export default function CosMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <MarketMobileHeader />
      <div className="flex flex-col container-custom mx-auto pt-6">
        <MarketMenu />

        {children}
      </div>

      <MarketSideBar />
    </div>
  );
}

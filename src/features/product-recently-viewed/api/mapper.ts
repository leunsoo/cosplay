import type { SidePanelProduct } from '@/entities/product';
import type { RecentlyViewedListDTO } from './get-recently-viewed-list';

export function mapRecentlyViewedProductToSidePanelProduct(
  dto: RecentlyViewedListDTO['products'][number]
): SidePanelProduct {
  return {
    id: dto.id,
    image: dto.mainImageUrl,
    title: dto.title,
    status: dto.status,
  };
}

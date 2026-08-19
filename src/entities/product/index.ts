export { ProductCard, ProductGrid, ProductSidePanel } from './ui';

// Types
export type {
  Product,
  BadgeInfo,
  ProductStatus,
  SidePanelProduct,
} from './model/product';
export { isProductInactive } from './model/product';

// 상품 상세 조회 훅 (product-detail 페이지 + product-chat에서 재사용)
export { useProductDetail } from './api/get-product-detail';

// 매퍼 (product-list, seller-product-list에서 재사용)
export { mapProductDTOsToProducts } from './api/mapper';

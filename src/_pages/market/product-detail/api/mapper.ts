import type { ProductDetailResponseDTO } from '@/shared/api/endpoints/product';
import type { Product } from '@/entities/product';

// Seller의 다른 상품 DTO를 Product 도메인 타입으로 변환
export function mapSellerProductDTOToProduct(
  dto: ProductDetailResponseDTO['sellerOtherProducts'][number]
): Product {
  return {
    id: dto.id,
    image: dto.mainImageUrl,
    title: dto.title,
    price: dto.price,
    createdAt: new Date(dto.createdAt),
  };
}

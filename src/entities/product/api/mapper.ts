import type { BadgeInfo, Product } from '../model/product';

// 여러 엔드포인트(getProductList, getSellerProducts 등)가 공통으로 내려주는
// 상품 목록 아이템 DTO 모양. 특정 엔드포인트 응답 타입에 결합하지 않는다.
interface ProductListItemDTO {
  id: number;
  title: string;
  price: number;
  mainImageUrl: string;
  createdAt: string;
  badges?: BadgeInfo[];
}

// ProductDTO를 Product 타입으로 변환
function mapProductDTOToProduct(dto: ProductListItemDTO): Product {
  return {
    id: dto.id,
    image: dto.mainImageUrl,
    title: dto.title,
    price: dto.price,
    createdAt: new Date(dto.createdAt),
    badges: dto.badges,
  };
}

// ProductDTO 배열을 Product 배열로 변환
export function mapProductDTOsToProducts(
  dtos: ProductListItemDTO[]
): Product[] {
  return dtos.map(mapProductDTOToProduct);
}

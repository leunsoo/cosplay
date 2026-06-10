import type { ProductListDTO } from './schema/getProductList';
import type { ProductDetailResponseDTO } from './schema/getProductDetail';
import type {
  Product,
  ProductDetail,
  Seller,
  ProductDetailWithSeller,
} from './types';

// ProductDTO를 Product 타입으로 변환
export function mapProductDTOToProduct(
  dto: ProductListDTO['products'][number]
): Product {
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
  dtos: ProductListDTO['products']
): Product[] {
  return dtos.map(mapProductDTOToProduct);
}

// Seller DTO를 Seller 도메인 타입으로 변환
export function mapSellerDTOToSeller(
  dto: ProductDetailResponseDTO['seller']
): Seller {
  return {
    id: dto.uuid,
    name: dto.name,
    avatar: dto.avatar,
  };
}

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

// ProductDetail DTO를 ProductDetail 도메인 타입으로 변환
export function mapProductDetailDTOToProductDetail(
  dto: ProductDetailResponseDTO['product']
): ProductDetail {
  return {
    id: dto.id,
    image: dto.mainImageUrl,
    title: dto.title,
    price: dto.price,
    description: dto.description,
    status: dto.status,
    shippingType: dto.shippingType,
    standardShipping: dto.standardShipping,
    economyShippingAvailable: dto.economyShippingAvailable,
    directTradeEnabled: dto.directTradeEnabled,
    directTradeLocation: dto.directTradeLocation,
    directTradePlace: dto.directTradePlace,
    priceNegotiable: dto.priceNegotiable,
    viewCount: dto.viewCount,
    favoriteCount: dto.favoriteCount,
    deliveryMethod: dto.deliveryMethod,
    createdAt: new Date(dto.createdAt),
  };
}

// 전체 ProductDetail API 응답을 도메인 타입으로 변환
export function mapProductDetailResponseDTOToProductDetailWithSeller(
  dto: ProductDetailResponseDTO
): ProductDetailWithSeller {
  return {
    product: mapProductDetailDTOToProductDetail(dto.product),
    seller: mapSellerDTOToSeller(dto.seller),
    sellerOtherProducts: dto.sellerOtherProducts.map(
      mapSellerProductDTOToProduct
    ),
  };
}

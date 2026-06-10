import { z } from 'zod';

// 상품 상세 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const ProductDetailDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  description: z.string().nullable(),
  mainImageUrl: z.string(),
  status: z.string(),
  shippingType: z.string(),
  standardShipping: z.number().nonnegative().nullable(),
  economyShippingAvailable: z.boolean(),
  directTradeEnabled: z.boolean().nullable(),
  directTradeLocation: z.string().nullable(),
  directTradePlace: z.string().nullable(),
  priceNegotiable: z.boolean(),
  viewCount: z.number().int().nonnegative(),
  favoriteCount: z.number().int().nonnegative(),
  deliveryMethod: z.string(),
  createdAt: z.string(),
});

const SellerDTOSchema = z.object({
  uuid: z.string(),
  name: z.string().min(1),
  avatar: z.string().nullable(),
});

const SellerProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  createdAt: z.string(),
  status: z.string(),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetProductDetailParamsSchema = z.object({
  productId: z.number().int().positive(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const ProductDetailResponseDTOSchema = z.object({
  product: ProductDetailDTOSchema,
  seller: SellerDTOSchema,
  sellerOtherProducts: z.array(SellerProductDTOSchema),
});

// ------------------ 타입 추론
export type GetProductDetailParams = z.infer<
  typeof GetProductDetailParamsSchema
>;
export type ProductDetailResponseDTO = z.infer<
  typeof ProductDetailResponseDTOSchema
>;

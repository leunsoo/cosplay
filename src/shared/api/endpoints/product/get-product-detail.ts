import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockProductDetails } from '@/mocks';

// 상품 상세 조회 API

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

export const GetProductDetailParamsSchema = z.object({
  productId: z.number().int().positive(),
});
export type GetProductDetailParams = z.infer<
  typeof GetProductDetailParamsSchema
>;

export const ProductDetailResponseDTOSchema = z.object({
  product: ProductDetailDTOSchema,
  seller: SellerDTOSchema,
  sellerOtherProducts: z.array(SellerProductDTOSchema),
});
export type ProductDetailResponseDTO = z.infer<
  typeof ProductDetailResponseDTOSchema
>;
export type Seller = ProductDetailResponseDTO['seller'];

export function resolveDemoProductDetail(
  productId: number
): ApiResponse<ProductDetailResponseDTO> {
  const detail = mockProductDetails[productId] ?? mockProductDetails[1];
  return { status: 'SUCCESS', message: '성공', data: detail };
}

export const getProductDetail = async (
  params: GetProductDetailParams
): Promise<ApiResponse<ProductDetailResponseDTO>> => {
  const validatedParams = GetProductDetailParamsSchema.parse(params);

  if (IS_DEMO) return resolveDemoProductDetail(validatedParams.productId);

  return apiClient.getWithValidation(
    `/api/v1/products/${validatedParams.productId}`,
    ProductDetailResponseDTOSchema
  );
};

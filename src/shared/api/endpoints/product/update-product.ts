import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoProduct } from '@/mocks';

// 상품 수정 API

export const UpdateProductParamsSchema = z.object({
  uuid: z.string(),
  productId: z.number().int().positive(),
});
export type UpdateProductParams = z.infer<typeof UpdateProductParamsSchema>;

export const UpdateProductBodySchema = z.object({
  title: z.string().min(1).max(20),
  price: z.number().nonnegative(),
  description: z.string(),
  priceNegotiable: z.boolean(),
  shippingType: z.enum(['separate', 'included']),
  standardShipping: z.number().nonnegative(),
  directTradeEnabled: z.enum(['possible', 'impossible']),
  directTradeLocation: z.string(),
  directTradePlace: z.string(),
  mainImageUrl: z.string(),
});
export type UpdateProductBody = z.infer<typeof UpdateProductBodySchema>;

export const UpdateProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  status: z.string(),
  updatedAt: z.string(),
});
export type UpdateProductDTO = z.infer<typeof UpdateProductDTOSchema>;

export const updateProduct = async (
  params: UpdateProductParams,
  body: UpdateProductBody
): Promise<ApiResponse<UpdateProductDTO>> => {
  const { productId, ...queryParams } = UpdateProductParamsSchema.parse(params);
  const validatedBody = UpdateProductBodySchema.parse(body);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: updateDemoProduct(productId, validatedBody),
    };
  }

  return apiClient.putWithValidation(
    `/api/v1/products/${productId}`,
    UpdateProductDTOSchema,
    validatedBody,
    { params: queryParams }
  );
};

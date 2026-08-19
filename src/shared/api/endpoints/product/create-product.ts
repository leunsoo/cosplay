import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { createDemoProduct } from '@/mocks';

// 상품 등록 API

export const CreateProductParamsSchema = z.object({
  uuid: z.string(),
});
export type CreateProductParams = z.infer<typeof CreateProductParamsSchema>;

export const CreateProductBodySchema = z.object({
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
export type CreateProductBody = z.infer<typeof CreateProductBodySchema>;

export const CreateProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  status: z.string(),
  createdAt: z.string(),
});
export type CreateProductDTO = z.infer<typeof CreateProductDTOSchema>;

export const createProduct = async (
  params: CreateProductParams,
  body: CreateProductBody
): Promise<ApiResponse<CreateProductDTO>> => {
  const validatedParams = CreateProductParamsSchema.parse(params);
  const validatedBody = CreateProductBodySchema.parse(body);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: createDemoProduct(validatedBody),
    };
  }

  return apiClient.postWithValidation(
    '/api/v1/products',
    CreateProductDTOSchema,
    validatedBody,
    { params: validatedParams }
  );
};

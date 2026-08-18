import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoProductStatus } from '@/mocks';

// 상품 상태 변경 API

export const UpdateProductStatusParamsSchema = z.object({
  uuid: z.string(),
  productId: z.number().int().positive(),
});
export type UpdateProductStatusParams = z.infer<
  typeof UpdateProductStatusParamsSchema
>;

export const UpdateProductStatusBodySchema = z.object({
  status: z.enum(['SELLING', 'RESERVED', 'SOLD']),
});
export type UpdateProductStatusBody = z.infer<
  typeof UpdateProductStatusBodySchema
>;

export const UpdateProductStatusDTOSchema = z.object({
  productId: z.number().int().positive(),
  status: z.string(),
  updatedAt: z.string(),
});
export type UpdateProductStatusDTO = z.infer<
  typeof UpdateProductStatusDTOSchema
>;

export const updateProductStatus = async (
  params: UpdateProductStatusParams,
  body: UpdateProductStatusBody
): Promise<ApiResponse<UpdateProductStatusDTO>> => {
  const { productId, ...queryParams } =
    UpdateProductStatusParamsSchema.parse(params);
  const validatedBody = UpdateProductStatusBodySchema.parse(body);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: updateDemoProductStatus(productId, validatedBody.status),
    };
  }

  return apiClient.patchWithValidation(
    `/api/v1/products/${productId}/status`,
    UpdateProductStatusDTOSchema,
    validatedBody,
    { params: queryParams }
  );
};

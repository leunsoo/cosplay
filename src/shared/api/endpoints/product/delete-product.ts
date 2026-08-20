import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { deleteDemoProduct } from '@/mocks';

// 상품 삭제 API

export const DeleteProductParamsSchema = z.object({
  uuid: z.string(),
  productId: z.number().int().positive(),
});
export type DeleteProductParams = z.infer<typeof DeleteProductParamsSchema>;

export const DeleteProductDTOSchema = z.object({
  productId: z.number().int().positive(),
  status: z.string(),
});
export type DeleteProductDTO = z.infer<typeof DeleteProductDTOSchema>;

export const deleteProduct = async (
  params: DeleteProductParams
): Promise<ApiResponse<DeleteProductDTO>> => {
  const { productId, ...queryParams } = DeleteProductParamsSchema.parse(params);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: deleteDemoProduct(productId),
    };
  }

  return apiClient.deleteWithValidation(
    `/api/v1/products/${productId}`,
    DeleteProductDTOSchema,
    { params: queryParams }
  );
};

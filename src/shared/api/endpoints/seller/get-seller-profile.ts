import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { getDemoSellerProfile } from '@/mocks';

const SellerProfileDTOSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  profileImageUrl: z.string().nullable(),
  introduction: z.string().nullable(),
});

export const GetSellerProfileParamsSchema = z.object({
  sellerId: z.string().min(1),
});
export type GetSellerProfileParams = z.infer<
  typeof GetSellerProfileParamsSchema
>;

export const SellerProfileResponseSchema = SellerProfileDTOSchema;
export type SellerProfileDTO = z.infer<typeof SellerProfileResponseSchema>;

/**
 * 판매자 프로필 정보 조회 API
 *
 * @param params - sellerUuid
 * @returns 판매자 프로필 데이터
 *
 * @example
 * ```ts
 * const response = await getSellerProfile({ sellerUuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * console.log(response.data);
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 응답이 스키마와 일치하지 않을 경우
 */
export const getSellerProfile = async (
  params: GetSellerProfileParams
): Promise<ApiResponse<SellerProfileDTO>> => {
  const validatedParams = GetSellerProfileParamsSchema.parse(params);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoSellerProfile(validatedParams.sellerId),
    };
  }

  return apiClient.getWithValidation(
    `/api/v1/sellers/${validatedParams.sellerId}`,
    SellerProfileResponseSchema
  );
};

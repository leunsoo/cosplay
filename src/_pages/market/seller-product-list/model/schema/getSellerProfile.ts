import { z } from 'zod';

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const SellerProfileDTOSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  profileImageUrl: z.string().nullable(),
  introduction: z.string().nullable(),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetSellerProfileParamsSchema = z.object({
  sellerId: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const SellerProfileResponseSchema = SellerProfileDTOSchema;

// ------------------ 타입 추론
export type GetSellerProfileParams = z.infer<
  typeof GetSellerProfileParamsSchema
>;
export type SellerProfileDTO = z.infer<typeof SellerProfileResponseSchema>;

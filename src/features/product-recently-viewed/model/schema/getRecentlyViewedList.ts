import { z } from 'zod';

// 최근 본 상품 목록 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const RecentlyViewedProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  viewedAt: z.string(),
  status: z.enum(['SELLING', 'RESERVED', 'SOLD', 'DELETED']),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetRecentlyViewedListParamsSchema = z.object({
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const RecentlyViewedListDTOSchema = z.object({
  products: z.array(RecentlyViewedProductDTOSchema),
  totalCount: z.number().int().nonnegative(),
});

// ------------------ 타입 추론
export type GetRecentlyViewedListParams = z.infer<
  typeof GetRecentlyViewedListParamsSchema
>;
export type RecentlyViewedListDTO = z.infer<typeof RecentlyViewedListDTOSchema>;

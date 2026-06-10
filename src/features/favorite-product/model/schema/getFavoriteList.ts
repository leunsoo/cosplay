import { z } from 'zod';

// 찜한 상품 목록 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const FavoriteProductDTOSchema = z.object({
  productId: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  favoritedAt: z.string(),
  status: z.enum(['SELLING', 'RESERVED', 'SOLD', 'DELETED']),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetFavoriteListParamsSchema = z.object({
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const FavoriteListDTOSchema = z.object({
  totalCount: z.number().int().nonnegative(),
  products: z.array(FavoriteProductDTOSchema),
});

// ------------------ 타입 추론
export type GetFavoriteListParams = z.infer<typeof GetFavoriteListParamsSchema>;
export type FavoriteListDTO = z.infer<typeof FavoriteListDTOSchema>;

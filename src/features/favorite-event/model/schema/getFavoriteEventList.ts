import { z } from 'zod';

// 찜한 행사 목록 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const FavoriteEventDTOSchema = z.object({
  eventId: z.number().int().positive(),
  title: z.string().min(1),
  thumbnailUrl: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  price: z.number(),
  status: z.string(),
  category: z.string(),
  favoritedAt: z.string(),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetFavoriteEventListParamsSchema = z.object({
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const FavoriteEventListDTOSchema = z.object({
  totalCount: z.number().int().nonnegative(),
  events: z.array(FavoriteEventDTOSchema),
});

// ------------------ 타입 추론
export type GetFavoriteEventListParams = z.infer<
  typeof GetFavoriteEventListParamsSchema
>;
export type FavoriteEventListDTO = z.infer<typeof FavoriteEventListDTOSchema>;

import { z } from 'zod';

// 배너 목록 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const BannerDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  displayOrder: z.number().int().nonnegative(),
  imageUrl: z.string(),
  linkUrl: z.string(),
  title: z.string(),
  description: z.string(),
  eventId: z.number().int().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const BannersDTOSchema = z.array(BannerDTOSchema);

// ------------------ 타입 추론
export type BannerDTO = z.infer<typeof BannerDTOSchema>;
export type BannersDTO = z.infer<typeof BannersDTOSchema>;

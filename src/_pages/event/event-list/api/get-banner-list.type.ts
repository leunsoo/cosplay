// 'use client' 파일(get-banner-list.ts)의 export는 서버에서 직접 호출할 수 없고
// (RSC client reference 에러), 'server-only' 파일(get-banner-list.server.ts)은
// 반대로 클라이언트에서 import할 수 없다.
// 스키마/타입은 양쪽이 함께 쓰므로 어느 한쪽 파일에도 둘 수 없어 지시어가 없는
// 이 파일로 분리했다.
import { z } from 'zod';

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

export const BannersDTOSchema = z.array(BannerDTOSchema);

export type BannerDTO = z.infer<typeof BannerDTOSchema>;
export type BannersDTO = z.infer<typeof BannersDTOSchema>;

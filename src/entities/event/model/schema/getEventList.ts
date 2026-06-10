import { z } from 'zod';

// 행사 목록 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
// 일단 검증 로직은 좀 더 고민해볼게욥
const EventDTOSchema = z.object({
  eventId: z.number().int().positive(),
  title: z.string().min(1),
  thumbnailUrl: z.string().url(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  // 이건 임시 값이고 나중에 아래 부분 정상적으로 올거니 그때 nullable 지우겠슴당
  price: z.number(),
  status: z.enum(['UPCOMING', 'ONGOING', 'CLOSED']),

  category: z.string(),
});

// ------------------ Response 스키마 (외부에서 사용)
// 현재 백엔드는 배열 직접 반환
export const EventListDTOSchema = z.array(EventDTOSchema);

// ------------------ 타입 추론
export type EventListDTO = z.infer<typeof EventListDTOSchema>;
export type EventDTO = z.infer<typeof EventDTOSchema>;

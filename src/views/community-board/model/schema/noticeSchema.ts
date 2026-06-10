import { z } from 'zod';

export const NoticeSummaryDTOSchema = z.object({
  id: z.number(),
  title: z.string(),
  isImportant: z.boolean(),
  viewCount: z.number(),
  createdAt: z.string(),
});

export const NoticeListDTOSchema = z.array(NoticeSummaryDTOSchema);

export const NoticeDetailDTOSchema = NoticeSummaryDTOSchema.extend({
  content: z.string(),
});

export type NoticeSummaryDTO = z.infer<typeof NoticeSummaryDTOSchema>;
export type NoticeDetailDTO = z.infer<typeof NoticeDetailDTOSchema>;
export type NoticeListDTO = z.infer<typeof NoticeListDTOSchema>;

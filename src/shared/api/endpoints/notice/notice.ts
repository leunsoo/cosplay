import { z } from 'zod';

export const NoticeSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  isImportant: z.boolean(),
  viewCount: z.number(),
  createdAt: z.string(),
});

export const NoticeListSchema = z.array(NoticeSummarySchema);

export const NoticeDetailSchema = NoticeSummarySchema.extend({
  content: z.string(),
});

export type NoticeSummary = z.infer<typeof NoticeSummarySchema>;
export type NoticeDetail = z.infer<typeof NoticeDetailSchema>;
export type NoticeList = z.infer<typeof NoticeListSchema>;

import { z } from 'zod';

export const QnaPostSummaryDTOSchema = z.object({
  id: z.number(),
  inquirer: z.string(),
  title: z.string(),
  isAnswer: z.boolean(),
  updatedAt: z.string(),
});

export const QnaPostListDTOSchema = z.array(QnaPostSummaryDTOSchema);

export const QnaPostDetailDTOSchema = z.object({
  id: z.number(),
  inquirer: z.string(),
  title: z.string(),
  content: z.string(),
  answer: z.string().nullable(),
  answerAt: z.string().nullable(),
  updatedAt: z.string(),
});

export type QnaPostSummaryDTO = z.infer<typeof QnaPostSummaryDTOSchema>;
export type QnaPostDetailDTO = z.infer<typeof QnaPostDetailDTOSchema>;
export type QnaPostListDTO = z.infer<typeof QnaPostListDTOSchema>;

import { z } from 'zod';

export const QnaSummarySchema = z.object({
  id: z.number(),
  inquirer: z.string(),
  title: z.string(),
  isAnswer: z.boolean(),
  updatedAt: z.string(),
});

export const QnaListSchema = z.array(QnaSummarySchema);

export const QnaDetailSchema = z.object({
  id: z.number(),
  inquirer: z.string(),
  title: z.string(),
  content: z.string(),
  answer: z.string().nullable(),
  answerAt: z.string().nullable(),
  updatedAt: z.string(),
});

export type QnaSummary = z.infer<typeof QnaSummarySchema>;
export type QnaDetail = z.infer<typeof QnaDetailSchema>;
export type QnaList = z.infer<typeof QnaListSchema>;

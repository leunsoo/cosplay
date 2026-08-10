import { z } from 'zod';

export const GenderSchema = z.enum(['MAN', 'WOMAN']);

export type Gender = z.infer<typeof GenderSchema>;

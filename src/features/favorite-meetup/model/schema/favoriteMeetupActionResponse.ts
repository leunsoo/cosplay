import { z } from 'zod';

export const FavoriteMeetupActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});

export type FavoriteMeetupActionResponse = z.infer<
  typeof FavoriteMeetupActionResponseSchema
>;

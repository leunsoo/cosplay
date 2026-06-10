import { z } from 'zod';

export const DeleteFavoriteMeetupParamsSchema = z.object({
  uuid: z.string().min(1),
  meetupId: z.number().int().positive(),
});

export type DeleteFavoriteMeetupParams = z.infer<
  typeof DeleteFavoriteMeetupParamsSchema
>;

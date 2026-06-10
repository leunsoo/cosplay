import { z } from 'zod';

export const AddFavoriteMeetupParamsSchema = z.object({
  uuid: z.string().min(1),
});

export const AddFavoriteMeetupBodySchema = z.object({
  meetupId: z.number().int().positive(),
});

export type AddFavoriteMeetupParams = z.infer<
  typeof AddFavoriteMeetupParamsSchema
>;
export type AddFavoriteMeetupBody = z.infer<typeof AddFavoriteMeetupBodySchema>;

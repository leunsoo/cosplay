import { z } from 'zod';

export const GetFavoriteMeetupStatusParamsSchema = z.object({
  uuid: z.string().min(1),
  meetupId: z.number().int().positive(),
});

export const FavoriteMeetupStatusDTOSchema = z.object({
  isFavorited: z.boolean(),
});

export type GetFavoriteMeetupStatusParams = z.infer<
  typeof GetFavoriteMeetupStatusParamsSchema
>;
export type FavoriteMeetupStatusDTO = z.infer<
  typeof FavoriteMeetupStatusDTOSchema
>;

import { z } from 'zod';

const FavoriteMeetupItemSchema = z.object({
  meetupId: z.number().int().positive(),
  title: z.string().min(1),
  thumbnailUrl: z.string(),
  scheduledAt: z.string(),
  location: z.string(),
  maxMembers: z.number().int().nonnegative(),
  currentMembers: z.number().int().nonnegative(),
  status: z.string(),
  favoritedAt: z.string(),
});

export const GetFavoriteMeetupListParamsSchema = z.object({
  uuid: z.string().min(1),
});

export const FavoriteMeetupListDTOSchema = z.object({
  totalCount: z.number().int().nonnegative(),
  meetups: z.array(FavoriteMeetupItemSchema),
});

export type GetFavoriteMeetupListParams = z.infer<
  typeof GetFavoriteMeetupListParamsSchema
>;
export type FavoriteMeetupListDTO = z.infer<typeof FavoriteMeetupListDTOSchema>;

import { z } from 'zod';

const UpdateGenderSchema = z.enum(['MAN', 'WOMAN']);

export const UpdateMyProfileBodySchema = z.object({
  uuid: z.string().min(1),
  nickname: z.string().min(1),
  name: z.string().nullable().optional(),
  gender: UpdateGenderSchema.nullable().optional(),
  phone: z.string().nullable().optional(),
  birthDate: z.string().date().nullable().optional(),
  email: z.string().nullable().optional(),
  profileImageUri: z.string().nullable(),
  introduction: z.string().nullable(),
  socialLink: z.string().nullable(),
  removeProfileImage: z.boolean(),
});

export const UpdateMyProfileDTOSchema = z.unknown();

export type UpdateMyProfileBody = z.infer<typeof UpdateMyProfileBodySchema>;
export type UpdateMyProfileDTO = z.infer<typeof UpdateMyProfileDTOSchema>;

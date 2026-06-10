import { z } from 'zod';

const ProfileGenderSchema = z.enum(['MAN', 'WOMAN']).nullable().optional();

export const GetMyProfileParamsSchema = z.object({
  uuid: z.string().min(1),
});

export const MyProfileDTOSchema = z.object({
  uuid: z.string().min(1).nullable().optional(),
  nickname: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  gender: ProfileGenderSchema,
  phone: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  profileImageUri: z.string().nullable().optional(),
  introduction: z.string().nullable().optional(),
  socialLink: z.string().nullable().optional(),
});

export type GetMyProfileParams = z.infer<typeof GetMyProfileParamsSchema>;
export type MyProfileDTO = z.infer<typeof MyProfileDTOSchema>;
export type ProfileGender = z.infer<typeof ProfileGenderSchema>;

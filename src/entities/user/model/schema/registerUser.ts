import { z } from 'zod';

const RegisterGenderSchema = z.enum(['MAN', 'WOMAN']);

export const RegisterUserBodySchema = z.object({
  nickname: z.string().min(1),
  name: z.string(),
  gender: RegisterGenderSchema,
  phone: z.string(),
  birthDate: z.string(),
  email: z.string(),
  profileImageUri: z.string().nullable().optional(),
  introduction: z.string().nullable().optional(),
});

export const RegisterUserDTOSchema = z.object({
  accessToken: z.string().min(1),
});

export type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;
export type RegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;

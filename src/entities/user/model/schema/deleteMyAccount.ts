import { z } from 'zod';

export const DeleteMyAccountBodySchema = z.object({
  uuid: z.string().min(1),
});

export const DeleteMyAccountDTOSchema = z.unknown();

export type DeleteMyAccountBody = z.infer<typeof DeleteMyAccountBodySchema>;
export type DeleteMyAccountDTO = z.infer<typeof DeleteMyAccountDTOSchema>;

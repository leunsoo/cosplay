import { z } from 'zod';

export const LogoutResponseSchema = z.null().or(z.undefined());

export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

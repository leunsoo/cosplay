import { z } from 'zod';

const MeetupMemberUserSchema = z.object({
  uuid: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable().optional(),
});

const MeetupMemberDTOSchema = z.object({
  user: MeetupMemberUserSchema,
  joinedAt: z.string(),
});

export const MeetupMembersDTOSchema = z.array(MeetupMemberDTOSchema);

export type MeetupMembersDTO = z.infer<typeof MeetupMembersDTOSchema>;
export type MeetupMemberDTO = z.infer<typeof MeetupMemberDTOSchema>;

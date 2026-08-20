export interface MeetupChatMessage {
  id: number;
  roomId: number;
  meetupId: number;
  senderUuid: string;
  senderNickname: string;
  senderProfileImageUri: string | null;
  content: string;
  type: string;
  createdAt: string;
  isMyMessage: boolean;
}

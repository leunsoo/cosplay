export interface EventChatMessage {
  id: number;
  roomId: number;
  eventId: number;
  senderUuid: string;
  senderNickname: string;
  senderProfileImageUri: string | null;
  content: string;
  type: string;
  createdAt: string;
  isMyMessage: boolean;
}

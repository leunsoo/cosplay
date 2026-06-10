export interface ChatMessage {
  senderNickname: string;
  senderProfileImageUri: string | null;
  content: string;
  createdAt: string;
  isMyMessage: boolean;
}

export interface EventChatRoom {
  roomId: number;
  eventId: number;
  status: string;
}

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

export interface EventChatActiveCount {
  count: number;
}

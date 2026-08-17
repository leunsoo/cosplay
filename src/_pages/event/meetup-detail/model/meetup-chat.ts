export interface MeetupChatRoom {
  roomId: number;
  meetupId: number;
  status: string;
}

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

export interface MeetupChatActiveCount {
  count: number;
}

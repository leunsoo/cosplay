export const CHAT_ROOM_LIST_QUERIES = {
  list: (userUuid: string) => ['chatRooms', userUuid] as const,
};

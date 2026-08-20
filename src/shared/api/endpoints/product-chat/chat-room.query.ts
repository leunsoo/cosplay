export const CHAT_ROOM_QUERIES = {
  all: () => ['chatRooms'] as const,
  list: (userUuid: string) => [...CHAT_ROOM_QUERIES.all(), userUuid] as const,

  detail: (roomId: number, userUuid: string) =>
    [...CHAT_ROOM_QUERIES.all(), 'detail', roomId, userUuid] as const,

  resolves: () => [...CHAT_ROOM_QUERIES.all(), 'resolve'] as const,
  resolve: (productId: number, buyerUuid: string, sellerUuid: string) =>
    [
      ...CHAT_ROOM_QUERIES.resolves(),
      productId,
      buyerUuid,
      sellerUuid,
    ] as const,
};

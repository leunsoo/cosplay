import type { ChatRoomListDTO } from '@/features/product-trade-chat/model/schema/getChatRoomList';
import type { ChatRoomDetailDTO } from '@/features/product-trade-chat/model/schema/getChatRoom';
import type { ResolveChatRoomDTO } from '@/features/product-trade-chat/model/schema/resolveChatRoom';
import type { MessageListDTO } from '@/features/product-trade-chat/model/schema/getChatMessages';
import { DEMO_USER_UUID } from './user';

export const mockChatRoomList: ChatRoomListDTO = [
  {
    roomId: 1,
    opponentNickname: '코스마켓',
    opponentProfileImageUri: 'https://picsum.photos/seed/seller-main/100/100',
    productPhotoUrl: 'https://picsum.photos/seed/prod-eren/400/400',
    productTitle: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
    lastMessage: '안녕하세요! 사이즈 M 재고 있나요?',
    lastMessageType: 'TEXT',
    unreadCount: 2,
  },
  {
    roomId: 2,
    opponentNickname: '애니코스',
    opponentProfileImageUri: null,
    productPhotoUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
    productTitle: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
    lastMessage: '배송은 언제쯤 될까요?',
    lastMessageType: 'TEXT',
    unreadCount: 0,
  },
];

export const mockChatRoomDetails: Record<number, ChatRoomDetailDTO> = {
  1: {
    roomId: 1,
    opponentNickname: '코스마켓',
    opponentProfileImageUri: 'https://picsum.photos/seed/seller-main/100/100',
    opponentUuid: 'demo-seller-uuid-0001',
    productId: 1,
    productPhotoUrl: 'https://picsum.photos/seed/prod-eren/400/400',
    productTitle: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
    productPrice: 35000,
    productStatus: 'SELLING',
  },
  2: {
    roomId: 2,
    opponentNickname: '애니코스',
    opponentProfileImageUri: null,
    opponentUuid: 'demo-seller-uuid-0002',
    productId: 2,
    productPhotoUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
    productTitle: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
    productPrice: 58000,
    productStatus: 'SELLING',
  },
};

export const mockResolveChatRoom: ResolveChatRoomDTO = {
  exists: false,
  roomId: null,
};

export const mockChatMessages: Record<number, MessageListDTO> = {
  1: [
    {
      id: 1,
      roomId: 1,
      senderUuid: DEMO_USER_UUID,
      message: '안녕하세요! 사이즈 M 재고 있나요?',
      type: 'TEXT',
      isRead: true,
      createdAt: '2025-06-10T14:00:00',
    },
    {
      id: 2,
      roomId: 1,
      senderUuid: 'demo-seller-uuid-0001',
      message: '네, 재고 있습니다! 상태도 아주 좋아요.',
      type: 'TEXT',
      isRead: true,
      createdAt: '2025-06-10T14:05:00',
    },
    {
      id: 3,
      roomId: 1,
      senderUuid: DEMO_USER_UUID,
      message: '직거래 가능한가요? 강남역 근처로 부탁드립니다.',
      type: 'TEXT',
      isRead: false,
      createdAt: '2025-06-10T14:10:00',
    },
    {
      id: 4,
      roomId: 1,
      senderUuid: 'demo-seller-uuid-0001',
      message: '네, 강남역 가능합니다. 주말 오후 어떠세요?',
      type: 'TEXT',
      isRead: false,
      createdAt: '2025-06-10T14:15:00',
    },
  ],
  2: [
    {
      id: 5,
      roomId: 2,
      senderUuid: DEMO_USER_UUID,
      message: '배송은 언제쯤 될까요?',
      type: 'TEXT',
      isRead: true,
      createdAt: '2025-06-09T11:00:00',
    },
    {
      id: 6,
      roomId: 2,
      senderUuid: 'demo-seller-uuid-0002',
      message: '결제 확인 후 1-2일 내로 발송해 드립니다.',
      type: 'TEXT',
      isRead: true,
      createdAt: '2025-06-09T11:10:00',
    },
  ],
};

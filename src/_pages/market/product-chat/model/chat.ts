export interface ChatRoom {
  id: string;
  userName: string;
  userAvatar: string | null;
  productTitle: string;
  lastMessage: string | null;
  lastMessageType?: 'IMAGE' | 'TEXT' | null;
  isActive?: boolean;
  thumbnailImage?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  type: 'receiver' | 'sender';
  message?: string;
  imageUrl?: string;
  timestamp: string; // ISO 문자열 — 표시 포맷팅은 MessageBubble에서 처리
}

export interface ChatProductInfo {
  productImage: string;
  productTitle: string;
  productPrice?: number; // getChatRoom 응답에 가격 없어 optional
  discountPrice?: number;
  opponentUuid?: string;
  productId?: number;
}

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
  timestamp: string;
  rawTimestamp?: string; // ISO 문자열, 날짜 구분선 계산용
  userName?: string;
  userAvatar?: string;
}

export interface ProductInfo {
  productImage: string;
  productTitle: string;
  productPrice?: number; // getChatRoom 응답에 가격 없어 optional
  discountPrice?: number;
  opponentUuid?: string;
  productId?: number;
}

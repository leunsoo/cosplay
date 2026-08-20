import { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

// subscribe() 호출 시 받는 입력값
export interface SubscribeInput {
  destination: string; // 구독할 채널 경로 (예: /topic/chat-room-1)
  callback: (message: IMessage) => void; // 해당 채널에 메시지가 오면 실행될 함수
  headers?: Record<string, string>; // 구독 시 추가로 전달할 헤더
}

// Map에 저장되는 구독 정보 (입력값 + 실제 구독 객체)
export interface SubscribeInfo extends SubscribeInput {
  subscription: StompSubscription | null; // 실제 구독 객체 (미연결 시 null)
}

export interface StompClientCallbacks {
  onConnect?: (frame: IFrame) => void;
  onDisconnect?: (frame: IFrame) => void;
  onStompError?: (frame: IFrame) => void;
  onWebSocketError?: (event: Event) => void;
  onWebSocketClose?: (event: CloseEvent) => void;
}

// publish() 호출 시 받는 입력값
export interface StompPublishOptions {
  destination: string; // 보낼 경로
  body: string; // 보낼 메세지
  headers?: Record<string, string>; // 전달할 헤더
}

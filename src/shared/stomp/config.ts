export interface StompConfig {
  brokerURL: string;
  connectHeaders?: Record<string, string>;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
  reconnectDelay?: number;
  debug?: boolean;
}

const stompConfig: StompConfig = {
  brokerURL: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:8080/ws/chat',
  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,
  reconnectDelay: 5000,
  debug: process.env.NODE_ENV === 'development',
};

export const getStompConfig = (): Readonly<StompConfig> => ({ ...stompConfig });

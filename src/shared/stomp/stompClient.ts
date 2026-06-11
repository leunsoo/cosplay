import { Client, IFrame, IMessage } from '@stomp/stompjs';
import { IS_DEMO } from '@/shared/lib/isDemo';
import SockJS from 'sockjs-client';
import {
  StompClientCallbacks,
  StompPublishOptions,
  SubscribeInput,
  SubscribeInfo,
} from './types';
import { getStompConfig, StompConfig } from './config';

export class StompClient {
  private client: Client;
  private config: StompConfig;
  private callbacks: StompClientCallbacks;
  private subscriptions: Map<string, SubscribeInfo>;

  constructor(callbacks?: StompClientCallbacks) {
    this.callbacks = callbacks || {};
    this.subscriptions = new Map();
    this.config = getStompConfig();

    this.client = new Client({
      webSocketFactory: () => new SockJS(this.config.brokerURL),
      connectHeaders: this.config.connectHeaders || {},
      heartbeatIncoming: this.config.heartbeatIncoming,
      heartbeatOutgoing: this.config.heartbeatOutgoing,
      reconnectDelay: this.config.reconnectDelay,

      debug: this.config.debug
        ? (str) => {
            console.log('[STOMP Debug]', str);
          }
        : () => {},

      onConnect: (frame: IFrame) => {
        if (this.config.debug) {
          console.log('[STOMP] Connected', frame);
        }
        this.resubscribeAll();
        this.callbacks.onConnect?.(frame);
      },

      onDisconnect: (frame: IFrame) => {
        if (this.config.debug) {
          console.log('[STOMP] Disconnected', frame);
        }
        this.callbacks.onDisconnect?.(frame);
      },

      onStompError: (frame: IFrame) => {
        if (this.config.debug) {
          console.error('[STOMP] Error', frame);
        }
        this.callbacks.onStompError?.(frame);
      },

      onWebSocketError: (event: Event) => {
        if (this.config.debug) {
          console.error('[STOMP] WebSocket Error', event);
        }
        this.callbacks.onWebSocketError?.(event);
      },

      onWebSocketClose: (event: CloseEvent) => {
        if (this.config.debug) {
          console.log('[STOMP] WebSocket Closed', event);
        }
        this.callbacks.onWebSocketClose?.(event);
      },
    });
  }

  connect(): void {
    if (IS_DEMO) return;
    this.client.activate();
  }

  disconnect(): void {
    this.subscriptions.clear();
    this.client.deactivate();
  }

  subscribe(subscriptionConfig: SubscribeInput): () => void {
    const { destination, callback, headers } = subscriptionConfig;

    if (this.client.connected) {
      const subscription = this.client.subscribe(
        destination,
        (message: IMessage) => {
          callback(message);
        },
        headers
      );

      this.subscriptions.set(destination, {
        destination,
        callback,
        headers,
        subscription,
      });
    } else {
      this.subscriptions.set(destination, {
        destination,
        callback,
        headers,
        subscription: null,
      });
    }

    return () => {
      this.subscriptions.get(destination)?.subscription?.unsubscribe();
      this.subscriptions.delete(destination);
    };
  }

  publish(options: StompPublishOptions): void {
    if (IS_DEMO) return;

    const { destination, body, headers } = options;

    if (!this.client.connected) {
      throw new Error('STOMP client is not connected');
    }

    this.client.publish({
      destination,
      body,
      headers: headers || {},
    });
  }

  getConnectionStatus(): boolean {
    return this.client.connected;
  }

  private resubscribeAll(): void {
    this.subscriptions.forEach((entry, destination) => {
      const subscription = this.client.subscribe(
        destination,
        (message: IMessage) => {
          entry.callback(message);
        },
        entry.headers
      );
      entry.subscription = subscription;
    });
  }

  updateCallbacks(callbacks: Partial<StompClientCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }
}

// 싱글톤 인스턴스
export const stompClient = new StompClient();

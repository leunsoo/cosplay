'use client';

import { useEffect, useRef } from 'react';
import { type EventChatMessage } from '../model';
import { ChatMessageBubble } from '@/entities/chat';

interface GroupMessageListProps {
  messages: EventChatMessage[];
}

export function GroupMessageList({ messages }: GroupMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-gray-50 dark:bg-[#1b0d1b]"
    >
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}

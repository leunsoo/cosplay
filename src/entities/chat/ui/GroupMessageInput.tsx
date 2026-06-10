'use client';

import { useState, KeyboardEvent } from 'react';

interface GroupMessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function GroupMessageInput({
  onSend,
  disabled,
}: GroupMessageInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2">
      <input
        className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-full px-4 text-sm focus:ring-1 focus:ring-primary dark:text-white"
        placeholder="메시지를 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !inputValue.trim()}
        className="size-9 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">send</span>
      </button>
    </div>
  );
}

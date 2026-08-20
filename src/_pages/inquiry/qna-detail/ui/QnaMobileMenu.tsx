'use client';

import { useEffect, useRef, useState } from 'react';
import type { QnaEditActions } from './qna-edit-actions';

export function QnaMobileMenu({
  isEditing,
  isDeleting,
  isUpdating,
  canSave,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: QnaEditActions) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={onCancel}
          disabled={isUpdating}
          className="px-3 py-1.5 text-sm text-gray-600 font-medium disabled:opacity-50"
        >
          취소
        </button>
        <button
          onClick={onSave}
          disabled={isUpdating || !canSave}
          className="px-3 py-1.5 text-sm bg-black text-white font-bold rounded-lg disabled:opacity-50"
        >
          {isUpdating ? '저장 중...' : '저장'}
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9"
      >
        <span className="material-symbols-outlined text-gray-600">
          more_vert
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 w-36 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            수정
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            disabled={isDeleting}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              delete
            </span>
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      )}
    </div>
  );
}

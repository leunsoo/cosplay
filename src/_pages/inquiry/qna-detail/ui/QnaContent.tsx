'use client';

import { useState } from 'react';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { formatDateTime } from '@/shared/ui';

interface QnaContentProps {
  post: QnaDetail;
  isMyPost: boolean;
  onDelete: () => void;
  isDeleting: boolean;
  onUpdate: (data: { title: string; content: string }) => void;
  isUpdating: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function QnaContent({
  post,
  isMyPost,
  onDelete,
  isDeleting,
  onUpdate,
  isUpdating,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: QnaContentProps) {
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  const updatedAtStr = formatDateTime(post.updatedAt);
  const answerAtStr = post.answerAt ? formatDateTime(post.answerAt) : null;

  const handleSave = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    onUpdate({ title: editTitle.trim(), content: editContent.trim() });
    onSave();
  };

  const handleCancel = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    onCancel();
  };

  return (
    <div className="space-y-4">
      {/* 질문 */}
      <article className="bg-white md:border md:border-gray-200 md:rounded-xl p-0 md:p-8">
        {/* 제목 */}
        <div className="mb-4 px-2 md:px-0 pt-4 md:pt-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength={100}
              className="w-full text-md md:text-2xl font-bold md:font-black text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          ) : (
            <h1 className="text-md md:text-2xl font-bold md:font-black text-gray-900">
              {post.title}
            </h1>
          )}
        </div>

        {/* 메타 + 데스크탑 버튼 */}
        <div className="flex flex-wrap items-center justify-between gap-y-1 pb-4 border-b border-gray-100 mb-6 px-2 md:px-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                person
              </span>
              {post.inquirer}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              {updatedAtStr}
            </span>
          </div>

          {/* 수정/삭제 — 데스크탑 전용 */}
          {isMyPost && (
            <div className="hidden md:flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                    취소
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={
                      isUpdating || !editTitle.trim() || !editContent.trim()
                    }
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-semibold transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      check
                    </span>
                    {isUpdating ? '저장 중...' : '저장'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onEdit}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      edit
                    </span>
                    수정
                  </button>
                  <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete
                    </span>
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="px-2 md:px-0 pb-2 md:pb-0">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={10}
              className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          ) : (
            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap min-h-30">
              {post.content}
            </div>
          )}
        </div>
      </article>

      {/* 답변 */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-3 bg-primary/5 border-b border-gray-200">
          <span className="material-symbols-outlined text-[18px] text-primary">
            support_agent
          </span>
          <span className="text-sm font-bold text-primary">답변</span>
        </div>

        {post.answer ? (
          <div className="px-6 py-6 bg-primary/5">
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {post.answer}
            </p>
            {answerAtStr && (
              <p className="mt-4 text-xs text-gray-400 text-right">
                {answerAtStr}
              </p>
            )}
          </div>
        ) : (
          <div className="px-6 py-8 flex items-center gap-2 text-gray-400 text-sm">
            <span className="material-symbols-outlined text-[18px]">
              hourglass_empty
            </span>
            아직 답변이 등록되지 않았습니다.
          </div>
        )}
      </div>
    </div>
  );
}

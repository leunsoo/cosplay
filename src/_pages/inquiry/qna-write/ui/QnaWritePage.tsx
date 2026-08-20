'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import { useLogined } from '@/shared/auth';
import { useCreateQna } from '../api/use-create-qna';

export function QnaWritePage() {
  const isLogined = useLogined();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutate: submitPost, isPending } = useCreateQna();

  useEffect(() => {
    if (!isLogined) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLogined, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    submitPost({ title: title.trim(), content: content.trim() });
  };

  return (
    <main className="container-custom pt-4 md:pt-8 md:pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">질문하기</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-1">
          궁금한 점이나 원하시는 점을 남겨주시면 운영진이 답변드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            required
            maxLength={100}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="질문 내용을 입력하세요"
            required
            rows={12}
            className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-between pt-2">
          <Link
            href={ROUTES.COMMUNITY.LIST}
            className="bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            취소
          </Link>
          <button
            type="submit"
            disabled={isPending || !title.trim() || !content.trim()}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-10 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              '등록 중...'
            ) : (
              <>
                등록하기
                <span className="material-symbols-outlined text-[18px]">
                  check
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

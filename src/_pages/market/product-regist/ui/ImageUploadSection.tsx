'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ImageUploadSectionProps {
  mainImageFile: File | undefined;
  onImageChange: (file: File | undefined) => void;
  error?: string;
  initialImageUrl?: string;
}

export function ImageUploadSection({
  mainImageFile,
  onImageChange,
  error,
  initialImageUrl,
}: ImageUploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl ?? null
  );

  useEffect(() => {
    if (!mainImageFile) {
      // 새 파일 없으면 초기 URL로 복원
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(initialImageUrl ?? null);
      return;
    }
    const url = URL.createObjectURL(mainImageFile);

    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [mainImageFile, initialImageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? undefined;
    onImageChange(file);
  };

  const handleRemove = () => {
    onImageChange(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-gray-900">
          대표 이미지 <span className="text-red-400">*</span>
        </h3>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="w-full md:w-auto">
        {previewUrl ? (
          <div className="relative w-full aspect-square md:w-48 md:h-48">
            <Image
              src={previewUrl}
              alt="대표 이미지 미리보기"
              fill
              className="object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 z-10 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-white text-sm">
                close
              </span>
            </button>
          </div>
        ) : (
          <label className="w-full aspect-square md:w-48 md:h-48 flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer group">
            <span className="material-symbols-outlined text-gray-400 text-3xl mb-1">
              add_a_photo
            </span>
            <span className="text-xs text-gray-500 font-medium">
              이미지 등록
            </span>
            <input
              ref={inputRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleChange}
            />
          </label>
        )}
      </div>
    </section>
  );
}

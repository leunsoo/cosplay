import { useState, useRef } from 'react';
import { getChatImageUploadUrl } from '../api/get-chat-image-upload-url';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { ChatImageCropModal } from './ChatImageCropModal';

interface MessageInputProps {
  onSend?: (message: string) => void;
  onSendImage?: (imageUrl: string) => void;
  disabled?: boolean;
}

export function MessageInput({
  onSend,
  onSendImage,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (disabled) return;
    const trimmed = message.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setCropImageSrc(objectUrl);
  };

  const handleCropSave = async (croppedBlob: Blob) => {
    setCropImageSrc(null);
    setIsUploadingImage(true);
    try {
      if (IS_DEMO) {
        // 데모 모드: 실제 업로드 없이 로컬 미리보기 URL 사용
        onSendImage?.(URL.createObjectURL(croppedBlob));
        return;
      }
      const { data } = await getChatImageUploadUrl({ filename: 'chat.webp' });
      await uploadToS3(data.uploadUrl, croppedBlob);
      onSendImage?.(data.imageUrl);
    } catch {
      // 업로드 실패 시 조용히 처리
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCropClose = () => {
    if (cropImageSrc) URL.revokeObjectURL(cropImageSrc);
    setCropImageSrc(null);
  };

  const isDisabled = disabled || isUploadingImage;

  return (
    <>
      {cropImageSrc && (
        <ChatImageCropModal
          imageSrc={cropImageSrc}
          onClose={handleCropClose}
          onSave={handleCropSave}
        />
      )}

      <div className="p-2 sm:p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white transition-all p-2 shadow-sm">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            className="w-full bg-transparent border-none p-2 resize-none focus:ring-0 text-sm text-gray-800 placeholder:text-gray-400 min-h-10 sm:min-h-15 disabled:text-gray-400 disabled:cursor-not-allowed"
            placeholder="메시지 입력... (줄바꿈: Shift+Enter)"
          ></textarea>
          <div className="flex justify-between items-center px-1 pb-1">
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
                disabled={isDisabled}
              />
              <button
                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="사진 첨부"
                disabled={isDisabled}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isUploadingImage ? 'hourglass_empty' : 'add_photo_alternate'}
                </span>
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={isDisabled}
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              전송
              <span className="material-symbols-outlined text-[16px]">
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

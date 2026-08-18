'use client';

import { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ChatImageCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onSave: (croppedBlob: Blob) => void;
}

function getCroppedBlob(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('crop 실패'));
          return;
        }
        resolve(blob);
      },
      'image/webp',
      0.85
    );
  });
}

export function ChatImageCropModal({
  imageSrc,
  onClose,
  onSave,
}: ChatImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const size = Math.min(width, height);
    setCrop({
      unit: 'px',
      width: size,
      height: size,
      x: (width - size) / 2,
      y: (height - size) / 2,
    });
  };

  const handleSave = async () => {
    if (!imgRef.current || !completedCrop) return;
    const blob = await getCroppedBlob(imgRef.current, completedCrop);
    onSave(blob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg w-[90vw] max-w-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900">이미지 편집</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            type="button"
          >
            <span className="material-symbols-outlined text-gray-600">
              close
            </span>
          </button>
        </div>

        <div className="p-4 bg-gray-100 flex items-center justify-center">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop"
              onLoad={onImageLoad}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(90vh - 200px)',
                objectFit: 'contain',
              }}
            />
          </ReactCrop>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
            type="button"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg text-sm"
            type="button"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onSave: (croppedImage: string) => void;
}

function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

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

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    }, 'image/jpeg');
  });
}

export function ImageCropModal({
  imageSrc,
  onClose,
  onSave,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;

    // 초기값: 이미지 전체 영역
    setCrop({
      unit: 'px',
      width: width,
      height: height,
      x: 0,
      y: 0,
    });
  };

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspectRatio(newAspect);

    // 비율 변경 시 크롭 영역을 중앙으로 재설정
    if (imgRef.current) {
      const { width, height } = imgRef.current;

      if (newAspect) {
        // 고정 비율인 경우
        let newWidth, newHeight;

        if (width / height > newAspect) {
          // 이미지가 더 넓은 경우
          newHeight = height;
          newWidth = height * newAspect;
        } else {
          // 이미지가 더 높은 경우
          newWidth = width;
          newHeight = width / newAspect;
        }

        setCrop({
          unit: 'px',
          width: newWidth,
          height: newHeight,
          x: (width - newWidth) / 2,
          y: (height - newHeight) / 2,
        });
      } else {
        // 자유 비율인 경우 - 전체 이미지
        setCrop({
          unit: 'px',
          width: width,
          height: height,
          x: 0,
          y: 0,
        });
      }
    }
  };

  const handleSave = async () => {
    if (imgRef.current && completedCrop) {
      const croppedImage = await getCroppedImg(imgRef.current, completedCrop);
      onSave(croppedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg md:rounded-lg w-full md:w-[90vw] md:max-w-4xl h-[calc(100dvh-128px)] md:h-auto md:max-h-[90vh] mb-24 md:mb-0 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">이미지 편집</h3>
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

        <div className="flex-1 p-4 bg-gray-100 flex items-center justify-center overflow-hidden">
          <div className="max-w-full max-h-full flex items-center justify-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
            >
              {/* react-image-crop 라이브러리는 실제 DOM의 <img> 요소가 필요하기 때문에 <Image> 사용 X */}
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
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            {/* 비율 선택 */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                비율
              </label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleAspectChange(undefined)}
                  className={`px-2.5 py-1 text-sm rounded ${
                    aspectRatio === undefined
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  type="button"
                >
                  자유
                </button>
                <button
                  onClick={() => handleAspectChange(1)}
                  className={`px-2.5 py-1 text-sm rounded ${
                    aspectRatio === 1
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  type="button"
                >
                  1:1
                </button>
                <button
                  onClick={() => handleAspectChange(4 / 3)}
                  className={`px-2.5 py-1 text-sm rounded ${
                    aspectRatio === 4 / 3
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  type="button"
                >
                  4:3
                </button>
                <button
                  onClick={() => handleAspectChange(16 / 9)}
                  className={`px-2.5 py-1 text-sm rounded ${
                    aspectRatio === 16 / 9
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  type="button"
                >
                  16:9
                </button>
              </div>
            </div>
            {/* 취소/적용 */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 md:flex-none px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                type="button"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 md:flex-none px-4 py-2 text-white bg-gray-900 hover:bg-gray-700 rounded-lg text-sm"
                type="button"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

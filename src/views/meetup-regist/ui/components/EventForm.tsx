'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { MeetupFormData } from '../../model';
import { DateTimePicker } from './DateTimePicker';

function RequiredLabel({ children }: { children: string }) {
  return (
    <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
      {children}
      <span className="text-red-500 leading-none">*</span>
    </p>
  );
}

interface EventFormProps {
  formData: MeetupFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onImageUpload: (file: File, preview: string) => void;
  onImageRemove: () => void;
  onLocationChange: (location: string) => void;
}

export function EventForm({
  formData,
  onChange,
  onDateChange,
  onTimeChange,
  onImageUpload,
  onImageRemove,
  onLocationChange,
}: EventFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [formData.description]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostcodeComplete = (data: {
    roadAddress: string;
    jibunAddress: string;
    buildingName: string;
  }) => {
    const address = data.roadAddress || data.jibunAddress;
    const fullAddress = data.buildingName
      ? `${address} (${data.buildingName})`
      : address;
    onLocationChange(fullAddress);
    setIsPostcodeOpen(false);
  };

  const handleMaxParticipantsKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) {
      e.preventDefault();
      return;
    }
    const allowed = [
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const fieldBox =
    'w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary transition';

  return (
    <div className="flex flex-col gap-6 bg-white md:border md:border-gray-200 md:rounded-2xl md:shadow-sm md:p-8 md:sm:p-10">
      {/* 상단: 이미지 + 필드 */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* 왼쪽: 대표 이미지 */}
        <div className="w-full md:w-2/5 shrink-0 flex flex-col gap-2">
          <p className="text-sm font-semibold text-gray-700">대표 이미지</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/jpeg,image/png"
            className="hidden"
          />
          {formData.thumbnailPreview ? (
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
              <Image
                src={formData.thumbnailPreview}
                alt="포스터 미리보기"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  onImageRemove();
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer gap-3"
            >
              <div className="text-primary">
                <span className="material-symbols-outlined text-4xl">
                  add_photo_alternate
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  이미지 업로드
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  권장 비율 1:1 (최대 5MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽: 입력 필드 */}
        <div className="w-full md:flex-1 flex flex-col gap-3.5 min-w-0">
          {/* 이벤트 이름 */}
          <div className="flex flex-col gap-2">
            <RequiredLabel>행사 제목</RequiredLabel>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              className={fieldBox}
              placeholder="예: 귀멸의 칼날 코스어 구해요!"
              required
            />
          </div>

          {/* 날짜 / 시간 */}
          <DateTimePicker
            value={formData.eventDate}
            timeValue={formData.eventTime}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
          />

          {/* 장소 */}
          <div className="flex flex-col gap-2">
            <RequiredLabel>장소</RequiredLabel>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPostcodeOpen(true)}
                className="flex items-center gap-1.5 px-4 py-3 bg-white border border-gray-200 hover:border-gray-400 rounded-md text-sm font-semibold text-gray-700 transition shrink-0"
              >
                주소 검색
              </button>
              <input
                type="text"
                name="location"
                value={formData.location}
                readOnly
                placeholder="주소를 검색해주세요"
                className={`${fieldBox} flex-1`}
                required
              />
            </div>
            <input
              type="text"
              name="locationDetail"
              value={formData.locationDetail}
              onChange={onChange}
              className={fieldBox}
              placeholder="자세한 위치를 입력해주세요"
              required
            />
          </div>

          {/* 모집 인원 */}
          <div className="flex flex-col gap-2">
            <RequiredLabel>모집 인원</RequiredLabel>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-4 py-3 w-full md:w-48">
              <span className="material-symbols-outlined text-[20px] text-gray-500 leading-none">
                group
              </span>
              <input
                type="text"
                inputMode="numeric"
                name="maxMembers"
                value={formData.maxMembers}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  onChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: 'maxMembers',
                      value: val,
                    },
                  });
                }}
                onKeyDown={handleMaxParticipantsKeyDown}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800"
                placeholder="인원 수 ( 최대 )"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 상세 설명 */}
      <div className="flex flex-col gap-2 border-t border-gray-100 pt-6">
        <RequiredLabel>상세 설명</RequiredLabel>
        <textarea
          ref={textareaRef}
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary transition resize-none leading-relaxed overflow-hidden"
          placeholder="이벤트에 대한 자세한 내용을 적어주세요. (참가 조건, 준비물, 일정표 등)"
          rows={5}
        />
      </div>

      {/* 주소 검색 모달 */}
      {isPostcodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsPostcodeOpen(false)}
          />
          <div className="relative bg-white shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">주소 검색</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsPostcodeOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <DaumPostcodeEmbed
              onComplete={handlePostcodeComplete}
              style={{ height: 450 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

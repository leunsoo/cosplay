'use client';

import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { DIRECT_TRADE_OPTIONS } from '../model/product-form';

interface DirectTradeSectionProps {
  directTradeEnabled: 'possible' | 'impossible';
  directTradeEnabledRegistration: UseFormRegisterReturn<'directTradeEnabled'>;
  directTradeLocation: string;
  onDirectTradeLocationChange: (value: string) => void;
  directTradePlaceRegistration: UseFormRegisterReturn<'directTradePlace'>;
  error?: string;
}

export function DirectTradeSection({
  directTradeEnabled,
  directTradeEnabledRegistration,
  directTradeLocation,
  onDirectTradeLocationChange,
  directTradePlaceRegistration,
  error,
}: DirectTradeSectionProps) {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleComplete = (data: {
    roadAddress: string;
    jibunAddress: string;
    buildingName: string;
  }) => {
    const address = data.roadAddress || data.jibunAddress;
    const fullAddress = data.buildingName
      ? `${address} (${data.buildingName})`
      : address;
    onDirectTradeLocationChange(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <label className="font-bold text-gray-900 md:col-span-1 pt-2">
          직거래
        </label>
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="flex gap-6">
            {DIRECT_TRADE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={directTradeEnabled === option.value}
                  {...directTradeEnabledRegistration}
                />
                <span className="text-sm font-medium text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          {/* 직거래 지역 설정 - 가능일 때만 표시 */}
          {directTradeEnabled === 'possible' && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col gap-3">
                {/* 주소 검색 영역 */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-4 py-2 bg-white border border-gray-300 rounded-sm text-sm font-medium text-gray-700 hover:bg-gray-50 shrink-0"
                      type="button"
                      onClick={() => setIsPostcodeOpen(true)}
                    >
                      주소 검색
                    </button>
                    <input
                      className="flex-1 min-w-0 rounded-sm border border-gray-300 bg-gray-100 text-sm py-2 px-3 text-gray-700"
                      placeholder="주소를 검색해 주세요"
                      type="text"
                      value={directTradeLocation}
                      readOnly
                    />
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                </div>

                {/* 상세 장소 */}
                <input
                  className="w-full rounded-sm border px-3 border-gray-300 text-sm py-2.5"
                  placeholder="희망하는 상세 장소를 입력해 주세요. (선택)"
                  type="text"
                  {...directTradePlaceRegistration}
                />

                {/* 안내 문구 */}
                <p className="text-xs px-3 text-gray-500">
                  예: 역삼역 2번 출구 앞
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 주소 검색 모달 */}
      {isPostcodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsPostcodeOpen(false)}
          />
          {/* 모달 컨텐츠 */}
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
              onComplete={handleComplete}
              style={{ height: 450 }}
            />
          </div>
        </div>
      )}
    </>
  );
}

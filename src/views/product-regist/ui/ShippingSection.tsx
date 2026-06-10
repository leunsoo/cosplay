import type { UseFormRegisterReturn } from 'react-hook-form';
import { SHIPPING_OPTIONS } from '../model/const';
import { formatPrice, parsePrice } from '@/shared/lib/formatPrice';

interface ShippingSectionProps {
  shippingType: 'included' | 'separate';
  shippingTypeRegistration: UseFormRegisterReturn<'shippingType'>;
  standardShippingValue: number;
  onStandardShippingChange: (value: number) => void;
  economyShipping: 'possible' | 'impossible';
  onEconomyShippingChange: (option: 'possible' | 'impossible') => void;
  error?: string;
}

export function ShippingSection({
  shippingType,
  shippingTypeRegistration,
  standardShippingValue,
  onStandardShippingChange,
  error,
}: ShippingSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
      <label className="font-bold text-gray-900 md:col-span-1">배송비</label>
      <div className="md:col-span-3 flex flex-col gap-4">
        <div className="flex gap-6">
          {SHIPPING_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                className=" border-gray-300"
                type="radio"
                value={option.value}
                checked={shippingType === option.value}
                {...shippingTypeRegistration}
              />
              <span className="text-sm font-medium text-gray-900">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        {/* 배송비 설정 영역 - 배송비 별도일 때만 표시 */}
        {shippingType === 'separate' && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <label className="text-sm text-gray-700 min-w-25">배송비</label>
                <div className="flex items-center gap-2">
                  <input
                    className="w-32 rounded-md bg-white border border-gray-300 text-sm py-2 text-right pr-2"
                    placeholder="입력"
                    type="text"
                    inputMode="numeric"
                    value={formatPrice(standardShippingValue)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/[^0-9]/g, '');
                      onStandardShippingChange(parsePrice(digits));
                    }}
                    onKeyDown={(e) =>
                      ['e', 'E', '+', '-', '.'].includes(e.key) &&
                      e.preventDefault()
                    }
                  />
                  <span className="text-sm text-gray-600">원</span>
                </div>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

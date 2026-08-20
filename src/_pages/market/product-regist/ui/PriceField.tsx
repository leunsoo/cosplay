import type { UseFormRegisterReturn } from 'react-hook-form';
import { formatPrice, parsePrice } from '@/shared/lib/format-price';

interface PriceFieldProps {
  label: string;
  required?: boolean;
  value: number;
  onChange: (value: number) => void;
  negotiableRegistration: UseFormRegisterReturn<'priceNegotiable'>;
  error?: string;
}

export function PriceField({
  label,
  required = false,
  value,
  onChange,
  negotiableRegistration,
  error,
}: PriceFieldProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <label className="font-bold text-gray-900 md:col-span-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="md:col-span-3">
        <div className="relative rounded-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">₩</span>
          </div>
          <input
            className={`block w-full rounded-md border pl-8 pr-12 sm:text-sm py-3 ${error ? 'border-red-400' : 'border-gray-200'}`}
            placeholder="0"
            type="text"
            inputMode="numeric"
            value={formatPrice(value)}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^0-9]/g, '');
              onChange(parsePrice(digits));
            }}
            onKeyDown={(e) =>
              ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()
            }
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">원</span>
          </div>
        </div>
        {error && <p className="mt-1 ml-1 text-sm text-red-400">{error}</p>}
        {/* 가격제시 체크박스 */}
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="rounded border-gray-300"
              type="checkbox"
              {...negotiableRegistration}
            />
            <span className="text-sm text-gray-600">가격 제안 받기</span>
          </label>
        </div>
      </div>
    </div>
  );
}

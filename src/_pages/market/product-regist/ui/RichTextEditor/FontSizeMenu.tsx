'use client';

import { useState } from 'react';

interface FontSizeMenuProps {
  currentFontSize: string;
  onSelect: (size: string) => void;
}

const FONT_SIZES = [
  '11px',
  '13px',
  '15px',
  '16px',
  '19px',
  '24px',
  '28px',
  '30px',
  '34px',
  '38px',
];

export function FontSizeMenu({ currentFontSize, onSelect }: FontSizeMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-2 py-1.5 text-[18px] hover:bg-gray-200  text-gray-600 text-left leading-none"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentFontSize}
      </button>
      {open && (
        <>
          {/* 백드롭: 바깥 클릭 시 닫기 */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300  shadow-lg z-20 min-w-20">
            {FONT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => {
                  onSelect(size);
                  setOpen(false);
                }}
                className="block w-full px-3 py-1.5 text-left hover:bg-gray-100 text-sm"
                type="button"
              >
                {size.replace('px', '')}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

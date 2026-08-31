import { ReactNode } from 'react';
import { ImageWithFallback, PageStepper } from '@/shared/ui';
import type { SidePanelProduct } from '../model/product';
import { isProductInactive } from '../model/product';

interface ProductSidePanelProps {
  title: string;
  totalCount: number;
  isLoading: boolean;
  products: SidePanelProduct[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onProductClick: (productId: number) => void;
  onProductRemove?: (productId: number) => void;
  headerAction?: ReactNode;
  dialog?: ReactNode;
}

export function ProductSidePanel({
  title,
  totalCount,
  isLoading,
  products,
  currentPage,
  totalPages,
  onPageChange,
  onProductClick,
  onProductRemove,
  headerAction,
  dialog,
}: ProductSidePanelProps) {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
      {/* 헤더 */}
      <div className="px-3 py-2 border-b border-gray-200 bg-gray-50/50">
        <div className="flex justify-center items-center mb-1 gap-1">
          <h2 className="text-gray-900 font-bold text-xs">{title}</h2>
          {headerAction}
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-red-500 text-sm">{totalCount}</span>
        </div>
      </div>

      {dialog}

      <div className="p-2 flex flex-col">
        {isLoading ? (
          <div
            className="flex items-center justify-center"
            style={{
              height: 'calc((var(--spacing-sidebar) - 1rem) * 3 + 1rem)',
            }}
          >
            <p className="text-xs text-gray-400">로딩 중...</p>
          </div>
        ) : (
          <>
            <div
              className="flex flex-col gap-2"
              style={{
                minHeight: 'calc((var(--spacing-sidebar) - 1rem) * 3 + 1rem)',
              }}
            >
              {products.map((product) => {
                const inactive = isProductInactive(product.status);
                return (
                  <div
                    key={product.id}
                    className="relative aspect-square w-full"
                  >
                    <div
                      className={[
                        'relative w-full h-full rounded-sm border border-gray-100 transition-all overflow-hidden',
                        inactive
                          ? 'grayscale cursor-default opacity-60'
                          : 'cursor-pointer hover:ring-2 hover:ring-primary',
                      ].join(' ')}
                      onClick={() => {
                        if (!inactive) onProductClick(product.id);
                      }}
                      title={inactive ? '판매불가 상품' : product.title}
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      {inactive && (
                        <div className="absolute inset-0 flex items-end justify-center pb-1 pointer-events-none">
                          <span className="text-[10px] text-white bg-black/80 rounded-md px-1">
                            판매불가
                          </span>
                        </div>
                      )}
                    </div>
                    {onProductRemove && inactive && (
                      <button
                        onClick={() => onProductRemove(product.id)}
                        className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                        title="목록에서 제거"
                      >
                        <span
                          className="material-symbols-outlined text-white"
                          style={{ fontSize: '10px' }}
                        >
                          close
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <PageStepper
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

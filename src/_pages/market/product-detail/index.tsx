'use client';

import { useRouter } from 'next/navigation';

import {
  ProductImage,
  ProductInfo,
  ProductDescription,
  SellerProductsSection,
} from './ui';
import { useProductDetail } from '@/entities/product';
import { useAddRecentlyViewed } from '@/features/product-recently-viewed';
import { useAuthStore } from '@/shared/auth';
import { isMe, useLogined } from '@/entities/auth';
import { ROUTES } from '@/shared/routes';

interface ProductDetailViewProps {
  productId: number;
}

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const router = useRouter();
  const userUuid = useAuthStore((state) => state.userUuid);
  const logined = useLogined();

  const { productDetail, isLoading, error } = useProductDetail(productId);

  // 최근 본 상품 추가
  useAddRecentlyViewed({ uuid: userUuid, productId });

  // 채팅하기 버튼 클릭 핸들러
  const handleChatClick = () => {
    const sellerUuid = productDetail?.seller.id ?? '';
    const chatPath = `/market/chat?productId=${productId}&sellerUuid=${sellerUuid}`;

    if (!logined) {
      router.push(`${ROUTES.LOGIN}?next=${encodeURIComponent(chatPath)}`);
      return;
    }

    router.push(chatPath);
  };

  if (isLoading || !productDetail) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 pb-20 lg:pb-4">
      {/* 목록 버튼 */}
      {/* <div className="flex items-center">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="material-symbols-outlined text-lg">list</span>
          목록
        </button>
      </div> */}

      <main className="flex flex-col gap-6 min-w-0">
        {/* Product Detail Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border-color p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-10 min-w-0">
            {/* Product Images */}
            <ProductImage mainImage={productDetail.product.image} />

            {/* Product Info */}
            <ProductInfo
              productId={productDetail.product.id}
              title={productDetail.product.title}
              mainImageUrl={productDetail.product.image}
              price={productDetail.product.price}
              shippingType={productDetail.product.shippingType}
              deliveryMethod={productDetail.product.deliveryMethod}
              directTradeLocation={productDetail.product.directTradeLocation}
              deliveryPrice={productDetail.product.standardShipping}
              directTradePlace={productDetail.product.directTradePlace}
              registeredDate={productDetail.product.createdAt.toLocaleDateString()}
              seller={productDetail.seller}
              currentStatus={productDetail.product.status}
              isOwner={isMe(productDetail.seller.id)}
              onChatClick={handleChatClick}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Description */}
          <ProductDescription description={productDetail.product.description} />

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Seller's Other Products */}
          <SellerProductsSection
            seller={productDetail.seller}
            products={productDetail.sellerOtherProducts}
            onViewMore={() =>
              router.push(`/market/seller/${productDetail.seller.id}/products`)
            }
          />
        </div>

        {/* Mobile Bottom Action Bar */}
        {/* <div className="lg:hidden fixed bottom-18 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {isMe(productDetail.seller.id) ? (
            <>
              <button
                onClick={() =>
                  router.push(
                    `/market/products/${productDetail.product.id}/edit`
                  )
                }
                className="flex-1 border border-gray-300 text-gray-700 font-bold h-11 rounded-lg flex items-center justify-center"
              >
                수정
              </button>
              <button
                onClick={() =>
                  router.push(`/market/products/${productDetail.product.id}`)
                }
                className="flex-1 border border-red-300 text-red-500 font-bold h-11 rounded-lg flex items-center justify-center"
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button className="flex flex-col items-center justify-center text-gray-500 min-w-12.5">
                <span className="material-symbols-outlined text-2xl">
                  favorite
                </span>
                <span className="text-[10px]">찜</span>
              </button>
              <button
                onClick={handleChatClick}
                className="flex-1 bg-primary text-white font-bold h-11 rounded-lg flex items-center justify-center"
              >
                채팅하기
              </button>
            </>
          )}
        </div> */}
      </main>
    </div>
  );
}

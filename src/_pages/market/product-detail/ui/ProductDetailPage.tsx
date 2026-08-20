'use client';

import { useRouter } from 'next/navigation';

import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductDescription } from './ProductDescription';
import { SellerProductsSection } from './SellerProductsSection';
import { useProductDetail } from '@/entities/product';
import { mapSellerProductDTOToProduct } from '../api/mapper';
import { useAddRecentlyViewed } from '../api/use-add-recently-viewed';
import { useAuthStore, isMe, useLogined } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';

interface ProductDetailPageProps {
  productId: number;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const router = useRouter();
  const userUuid = useAuthStore((state) => state.userUuid);
  const logined = useLogined();

  const { productDetail, isLoading, error } = useProductDetail(productId);

  // 최근 본 상품 추가
  useAddRecentlyViewed({ uuid: userUuid, productId });

  // 채팅하기 버튼 클릭 핸들러
  const handleChatClick = () => {
    const sellerUuid = productDetail?.seller.uuid ?? '';
    const chatPath = `${ROUTES.CHAT}?productId=${productId}&sellerUuid=${sellerUuid}`;

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
      <main className="flex flex-col gap-6 min-w-0">
        {/* Product Detail Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border-color p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-10 min-w-0">
            {/* Product Images */}
            <ProductImage mainImage={productDetail.product.mainImageUrl} />

            {/* Product Info */}
            <ProductInfo
              productId={productDetail.product.id}
              title={productDetail.product.title}
              mainImageUrl={productDetail.product.mainImageUrl}
              price={productDetail.product.price}
              shippingType={productDetail.product.shippingType}
              deliveryMethod={productDetail.product.deliveryMethod}
              directTradeLocation={productDetail.product.directTradeLocation}
              deliveryPrice={productDetail.product.standardShipping}
              directTradePlace={productDetail.product.directTradePlace}
              registeredDate={new Date(
                productDetail.product.createdAt
              ).toLocaleDateString()}
              seller={productDetail.seller}
              currentStatus={productDetail.product.status}
              isOwner={isMe(productDetail.seller.uuid)}
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
            products={productDetail.sellerOtherProducts.map(
              mapSellerProductDTOToProduct
            )}
            onViewMore={() =>
              router.push(ROUTES.SELLER.PRODUCTS(productDetail.seller.uuid))
            }
          />
        </div>
      </main>
    </div>
  );
}

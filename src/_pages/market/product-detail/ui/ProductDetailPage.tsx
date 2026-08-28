import type { ProductDetailResponseDTO } from '@/shared/api/endpoints/product';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductDescription } from './ProductDescription';
import { SellerProductsSection } from './SellerProductsSection';
import { mapSellerProductDTOToProduct } from '../api/mapper';

interface ProductDetailPageProps {
  productDetail: ProductDetailResponseDTO;
}

export function ProductDetailPage({ productDetail }: ProductDetailPageProps) {
  const { product, seller, sellerOtherProducts } = productDetail;

  return (
    <div className="flex flex-col gap-4 pb-20 lg:pb-4">
      <main className="flex flex-col gap-6 min-w-0">
        {/* Product Detail Section */}
        <div className="bg-white rounded-xl shadow-sm border border-border-color p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-10 min-w-0">
            {/* Product Images */}
            <ProductImage mainImage={product.mainImageUrl} />

            {/* Product Info */}
            <ProductInfo
              productId={product.id}
              title={product.title}
              mainImageUrl={product.mainImageUrl}
              price={product.price}
              shippingType={product.shippingType}
              deliveryMethod={product.deliveryMethod}
              directTradeLocation={product.directTradeLocation}
              deliveryPrice={product.standardShipping}
              directTradePlace={product.directTradePlace}
              registeredDate={new Date(product.createdAt).toLocaleDateString()}
              seller={seller}
              currentStatus={product.status}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Description */}
          <ProductDescription description={product.description} />

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Seller's Other Products */}
          <SellerProductsSection
            seller={seller}
            products={sellerOtherProducts.map(mapSellerProductDTOToProduct)}
          />
        </div>
      </main>
    </div>
  );
}

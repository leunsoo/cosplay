import { type ProductDetailResponseDTO } from '@/entities/product/model';

interface ProductJsonLdProps {
  product: ProductDetailResponseDTO['product'];
  id: string;
}

/**
 * 상품 상세 페이지 JSON-LD 구조화 데이터 컴포넌트
 *
 * JSON-LD는 <body> 안에 위치하는 <script> 태그입니다.
 * generateMetadata(<head>)와 달리 JSX로 렌더링합니다.
 *
 * 구글이 이 데이터를 인식하면 검색 결과에 가격/재고 리치 스니펫이 표시됩니다.
 */
export function ProductJsonLd({ product, id }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description ?? product.title,
    image: product.mainImageUrl,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/market/products/${id}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KRW',
      availability:
        product.status === 'SELLING'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      seller: {
        '@type': 'Organization',
        name: 'LLOWA',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

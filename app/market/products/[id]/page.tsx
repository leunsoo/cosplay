// 동적 라우트([id])는 빌드 시 모든 경우의 수를 알 수 없으므로 force-dynamic
export const dynamic = 'force-dynamic';

import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { getProductDetailServer } from '@/entities/product';
import { ProductDetailView } from '@/_pages/market/product-detail';
import { ProductJsonLd } from './_components/ProductJsonLd';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 상품 데이터를 서버에서 fetch하는 공통 함수
 *
 * generateMetadata와 페이지 컴포넌트에서 동일한 URL로 fetch하면
 * Next.js가 자동으로 중복 제거(dedup)합니다. (실제 API 호출은 1번)
 */
async function fetchProductDetail(id: string) {
  const response = await getProductDetailServer({ productId: Number(id) });
  return response.data;
}

/**
 * 상품 상세 페이지 동적 메타데이터
 *
 * generateMetadata는 서버에서 실행되며, 각 상품의 실제 데이터로
 * 페이지별 고유한 title/description/OG 태그를 생성합니다.
 *
 * 예시:
 *   /market/products/1 → title: "코스프레 의상 판매 - LLOWA"
 *   /market/products/2 → title: "가발 일괄 판매 - LLOWA"
 */
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { product } = await fetchProductDetail(id);

    return {
      title: product.title,
      description:
        product.description ??
        `${product.title} - ${product.price.toLocaleString()}원`,
      openGraph: {
        title: `${product.title} - LLOWA`,
        description:
          product.description ??
          `${product.title} - ${product.price.toLocaleString()}원`,
        images: [{ url: product.mainImageUrl, alt: product.title }],
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/market/products/${id}`,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/market/products/${id}`,
      },
    };
  } catch {
    return {
      title: '상품 상세',
      description: '코스프레 상품 상세 정보를 확인하세요.',
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  let productData = null;
  try {
    productData = await fetchProductDetail(id);

    // prefetchQuery: useProductDetail의 useQuery(['product', productId])와 동일한 queryKey
    // → 클라이언트에서 API 재호출 없이 캐시에서 즉시 데이터를 가져옴 → SEO 가능
    await queryClient.prefetchQuery({
      queryKey: ['product', Number(id)],
      queryFn: () => fetchProductDetail(id),
    });
  } catch {
    // JSON-LD/prefetch 실패 시 무시 (ProductDetailView는 자체적으로 에러 처리)
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {productData && <ProductJsonLd product={productData.product} id={id} />}
      <ProductDetailView productId={Number(id)} />
    </HydrationBoundary>
  );
}

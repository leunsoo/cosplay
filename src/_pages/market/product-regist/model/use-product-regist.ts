import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  createProduct,
  uploadProductImages,
  updateProduct,
} from '@/entities/product';
import { FAVORITE_PRODUCT_QUERIES } from '@/shared/api/favorite-product';
import { useAuthStore } from '@/shared/auth';
import { base64ToBlob, convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/isDemo';
import type { ProductFormData } from './types';

interface UseProductRegistOptions {
  productId?: number;
  initialImageUrl?: string;
}

/** description HTML에서 base64 img src 목록 추출 */
function extractBase64Images(html: string): string[] {
  const matches = html.match(/src="(data:image\/[^"]+)"/g) ?? [];
  return matches.map((m) => m.slice(5, -1)); // src=" ... " 제거
}

export function useProductRegist({
  productId,
  initialImageUrl,
}: UseProductRegistOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);
  const isEditMode = productId !== undefined;

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (formData: ProductFormData) => {
      // 1. description에서 base64 이미지 추출
      const base64Images = extractBase64Images(formData.description);
      const hasDetailImages = base64Images.length > 0;

      // 2. 메인 이미지 URL 결정 (새 파일 없으면 기존 URL 유지)
      let mainImageUrl: string;

      if (formData.mainImageFile) {
        if (IS_DEMO) {
          // 데모 모드: 실제 업로드 없이 로컬 미리보기 URL 사용
          mainImageUrl = URL.createObjectURL(formData.mainImageFile);
        } else {
          // 새 파일 선택 → S3 업로드
          const mainUrlRes = await uploadProductImages({
            imageType: 'main',
            imageCount: 1,
          });
          const { uploadUrl: mainUploadUrl, imageUrl } =
            mainUrlRes.data.uploadUrls[0];
          const mainWebp = await convertToWebp(formData.mainImageFile);
          await uploadToS3(mainUploadUrl, mainWebp);
          mainImageUrl = imageUrl;
        }
      } else if (isEditMode && initialImageUrl) {
        // 수정 모드 + 이미지 미변경 → 기존 URL 유지
        mainImageUrl = initialImageUrl;
      } else {
        throw new Error('메인 이미지를 등록해주세요.');
      }

      // 3. detail 이미지 업로드 URL 목록 결정
      let detailUploadItems: { uploadUrl: string; imageUrl: string }[] = [];

      if (hasDetailImages) {
        if (IS_DEMO) {
          // 데모 모드: 실제 업로드 없이 로컬 미리보기 URL 사용
          detailUploadItems = base64Images.map((base64) => ({
            uploadUrl: '',
            imageUrl: URL.createObjectURL(base64ToBlob(base64)),
          }));
        } else {
          // Pre-signed URL 발급 (detail 병렬)
          const detailUrlRes = await uploadProductImages({
            imageType: 'detail',
            imageCount: base64Images.length,
          });
          detailUploadItems = detailUrlRes.data.uploadUrls;

          // detail 이미지 webp 변환 + S3 업로드 병렬
          const detailWebps = await Promise.all(
            base64Images.map((b64) => convertToWebp(base64ToBlob(b64)))
          );
          const uploadResults = await Promise.allSettled(
            detailUploadItems.map((item, i) =>
              uploadToS3(item.uploadUrl, detailWebps[i])
            )
          );
          const failed = uploadResults.some((r) => r.status === 'rejected');
          if (failed) {
            alert('이미지 업로드에 실패했습니다.');
            throw new Error('S3 upload failed');
          }
        }
      }

      // 4. description의 base64를 imageUrl로 교체
      let processedDescription = formData.description;
      base64Images.forEach((base64, i) => {
        processedDescription = processedDescription.replace(
          `src="${base64}"`,
          `src="${detailUploadItems[i].imageUrl}"`
        );
      });

      const productBody = {
        title: formData.title,
        price: Number(formData.price),
        description: processedDescription,
        priceNegotiable: formData.priceNegotiable,
        shippingType: formData.shippingType,
        standardShipping: Number(formData.standardShipping) || 0,
        directTradeEnabled: formData.directTradeEnabled,
        directTradeLocation: formData.directTradeLocation,
        directTradePlace: formData.directTradePlace,
        mainImageUrl,
      };

      // 5. 등록 or 수정
      if (isEditMode) {
        return updateProduct({ uuid: userUuid, productId }, productBody);
      }
      return createProduct({ uuid: userUuid }, productBody);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (isEditMode) {
        queryClient.invalidateQueries({
          queryKey: FAVORITE_PRODUCT_QUERIES.all(),
        });
        queryClient.invalidateQueries({
          queryKey: ['recently-viewed', userUuid],
        });
      }
      router.push(`/market/products/${response.data.id}`);
    },
    onError: (error) => {
      console.error(isEditMode ? '상품 수정 실패:' : '상품 등록 실패:', error);
    },
  });

  return { submit, isPending };
}

import { uploadProductImages } from '@/shared/api/endpoints/product';
import { base64ToBlob, convertToWebp } from '@/shared/lib/image-format';
import { uploadToS3 } from '@/shared/lib/s3';
import { IS_DEMO } from '@/shared/lib/is-demo';
import type { ProductFormValues } from '../model/product-form';

/** description HTML에서 base64 img src 목록 추출 */
function extractBase64Images(html: string): string[] {
  const matches = html.match(/src="(data:image\/[^"]+)"/g) ?? [];
  return matches.map((m) => m.slice(5, -1)); // src=" ... " 제거
}

async function resolveMainImageUrl(
  mainImageFile: File | undefined,
  fallbackImageUrl: string | undefined
): Promise<string> {
  if (mainImageFile) {
    if (IS_DEMO) {
      // 데모 모드: 실제 업로드 없이 로컬 미리보기 URL 사용
      return URL.createObjectURL(mainImageFile);
    }
    // 새 파일 선택 → S3 업로드
    const mainUrlRes = await uploadProductImages({
      imageType: 'main',
      imageCount: 1,
    });
    const { uploadUrl: mainUploadUrl, imageUrl } =
      mainUrlRes.data.uploadUrls[0];
    const mainWebp = await convertToWebp(mainImageFile);
    await uploadToS3(mainUploadUrl, mainWebp);
    return imageUrl;
  }

  // 새 파일이 없으면 기존 URL 유지 (수정 모드 + 이미지 미변경).
  // ProductForm이 제출 전에 새 파일도 기존 URL도 없는 상태를 이미 막아주므로
  // 여기 도달했다면 fallbackImageUrl은 항상 유효하다.
  return fallbackImageUrl!;
}

async function resolveDescription(description: string): Promise<string> {
  const base64Images = extractBase64Images(description);
  if (base64Images.length === 0) return description;

  let detailUploadItems: { uploadUrl: string; imageUrl: string }[];

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

  let processedDescription = description;
  base64Images.forEach((base64, i) => {
    processedDescription = processedDescription.replace(
      `src="${base64}"`,
      `src="${detailUploadItems[i].imageUrl}"`
    );
  });
  return processedDescription;
}

// 폼 값 → 등록/수정 API 공통 바디로 변환 (메인/상세 이미지 업로드 포함)
export async function buildProductBody(
  formData: ProductFormValues,
  fallbackImageUrl?: string
) {
  const mainImageUrl = await resolveMainImageUrl(
    formData.mainImageFile,
    fallbackImageUrl
  );
  const description = await resolveDescription(formData.description);

  return {
    title: formData.title,
    price: formData.price,
    description,
    priceNegotiable: formData.priceNegotiable,
    shippingType: formData.shippingType,
    standardShipping: formData.standardShipping,
    directTradeEnabled: formData.directTradeEnabled,
    directTradeLocation: formData.directTradeLocation,
    directTradePlace: formData.directTradePlace,
    mainImageUrl,
  };
}

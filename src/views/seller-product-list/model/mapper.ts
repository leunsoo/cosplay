import type { SellerProfileDTO } from './schema';
import type { SellerProfile } from './types';

/**
 * SellerProfileDTO를 SellerProfile 도메인 타입으로 변환
 *
 * @param dto - API 응답 DTO
 * @returns 도메인 타입으로 변환된 판매자 프로필
 */
export function mapSellerProfileDTOToSellerProfile(
  dto: SellerProfileDTO
): SellerProfile {
  return {
    uuid: dto.uuid,
    name: dto.name,
    avatarUrl: dto.profileImageUrl,
    introduction: dto.introduction,
  };
}

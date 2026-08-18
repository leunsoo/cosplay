/**
 * 클라이언트에서 사용하는 타입을 정의하는 파일
 */

type BadgeLabel = '거래제안가능' | '배송비포함' | '직거래가능';

export interface BadgeInfo {
  label: BadgeLabel;
}

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  createdAt: Date;
  badges?: BadgeInfo[];
}

export type ProductStatus = 'SELLING' | 'RESERVED' | 'SOLD' | 'DELETED';

export function isProductInactive(status: ProductStatus): boolean {
  return status === 'SOLD' || status === 'DELETED';
}

export interface SidePanelProduct {
  id: number;
  image: string;
  title: string;
  status: ProductStatus;
}

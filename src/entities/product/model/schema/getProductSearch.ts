import { z } from 'zod';

// 상품 검색 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const BadgeLabelSchema = z.enum(['거래제안가능', '배송비포함', '직거래가능']);

const BadgeDTOSchema = z.object({
  label: BadgeLabelSchema,
});

const ProductSearchItemDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  createdAt: z.string(),
  badges: z.array(BadgeDTOSchema),
});

const PaginationDTOSchema = z.object({
  currentPage: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  totalElements: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetProductSearchParamsSchema = z.object({
  keyword: z.string().min(1),
  page: z.number().int().positive(),
  uuid: z.string().optional(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const ProductSearchDTOSchema = z.object({
  products: z.array(ProductSearchItemDTOSchema),
  pagination: PaginationDTOSchema,
});

// ------------------ 타입 추론
export type GetProductSearchParams = z.infer<
  typeof GetProductSearchParamsSchema
>;
export type ProductSearchDTO = z.infer<typeof ProductSearchDTOSchema>;

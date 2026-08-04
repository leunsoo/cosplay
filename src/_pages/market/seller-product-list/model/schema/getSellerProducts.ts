import { z } from 'zod';

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const BadgeLabelSchema = z.enum(['거래제안가능', '배송비포함', '직거래가능']);

const BadgeDTOSchema = z.object({
  label: BadgeLabelSchema,
});

const ProductDTOSchema = z.object({
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
export const GetSellerProductsParamsSchema = z.object({
  sellerId: z.string(),
  page: z.number().int().positive().default(1),
  size: z.number().int().positive().default(8),
});

// ------------------ Response 스키마 (외부에서 사용)
export const SellerProductsResponseSchema = z.object({
  products: z.array(ProductDTOSchema),
  pagination: PaginationDTOSchema,
});

// ------------------ 타입 추론
export type GetSellerProductsParams = z.infer<
  typeof GetSellerProductsParamsSchema
>;
export type SellerProductsDTO = z.infer<typeof SellerProductsResponseSchema>;

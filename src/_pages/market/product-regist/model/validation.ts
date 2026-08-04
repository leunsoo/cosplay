import { z } from 'zod';

export const ProductFormSchema = z
  .object({
    title: z
      .string()
      .min(1, '제목을 입력해주세요')
      .max(40, '제목은 40자 이내로 입력해주세요'),
    price: z
      .number()
      .nonnegative()
      .refine((v) => !isNaN(v) && v > 0, { message: '가격을 입력해주세요' }),
    mainImageFile: z.instanceof(File).optional(),
    description: z.string().refine(
      (v) => {
        const text = v.replace(/<[^>]*>/g, '').trim();
        const hasImage = /<img\s/i.test(v);
        return text.length > 0 || hasImage;
      },
      { message: '상품 설명을 입력해주세요' }
    ),
    priceNegotiable: z.boolean(),
    shippingType: z.enum(['included', 'separate']),
    standardShipping: z.number().nonnegative(),
    economyShipping: z.enum(['possible', 'impossible']),
    directTradeEnabled: z.enum(['possible', 'impossible']),
    directTradeLocation: z.string(),
    directTradePlace: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.shippingType === 'separate' && data.standardShipping <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '배송비를 입력해주세요',
        path: ['standardShipping'],
      });
    }

    if (data.directTradeEnabled === 'possible') {
      if (!data.directTradeLocation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '직거래 주소를 검색해주세요',
          path: ['directTradeLocation'],
        });
      }
    }
  });

export type ProductFormValues = z.infer<typeof ProductFormSchema>;

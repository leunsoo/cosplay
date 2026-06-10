export {
  GetProductListParamsSchema,
  ProductListDTOSchema,
  type GetProductListParams,
  type ProductListDTO,
} from './schema/getProductList';

export {
  GetProductSearchParamsSchema,
  ProductSearchDTOSchema,
  type GetProductSearchParams,
  type ProductSearchDTO,
} from './schema/getProductSearch';

export {
  GetProductDetailParamsSchema,
  ProductDetailResponseDTOSchema,
  type GetProductDetailParams,
  type ProductDetailResponseDTO,
} from './schema/getProductDetail';

export {
  CreateProductParamsSchema,
  CreateProductBodySchema,
  CreateProductDTOSchema,
  type CreateProductParams,
  type CreateProductBody,
  type CreateProductDTO,
} from './schema/createProduct';

export {
  UploadProductImagesBodySchema,
  UploadProductImagesDTOSchema,
  type UploadProductImagesBody,
  type UploadProductImagesDTO,
} from './schema/uploadProductImages';

export {
  UpdateProductParamsSchema,
  UpdateProductBodySchema,
  UpdateProductDTOSchema,
  type UpdateProductParams,
  type UpdateProductBody,
  type UpdateProductDTO,
} from './schema/updateProduct';

export {
  DeleteProductParamsSchema,
  DeleteProductDTOSchema,
  type DeleteProductParams,
  type DeleteProductDTO,
} from './schema/deleteProduct';

export {
  UpdateProductStatusParamsSchema,
  UpdateProductStatusBodySchema,
  UpdateProductStatusDTOSchema,
  type UpdateProductStatusParams,
  type UpdateProductStatusBody,
  type UpdateProductStatusDTO,
} from './schema/updateProductStatus';

export type {
  Product,
  BadgeInfo,
  ProductStatus,
  SidePanelProduct,
  ProductDetail,
  Seller,
  ProductDetailWithSeller,
} from './types';

export { isProductInactive } from './types';

export {
  mapProductDTOToProduct,
  mapProductDTOsToProducts,
  mapSellerDTOToSeller,
  mapSellerProductDTOToProduct,
  mapProductDetailDTOToProductDetail,
  mapProductDetailResponseDTOToProductDetailWithSeller,
} from './mapper';

export { useProductDetail } from './hooks';

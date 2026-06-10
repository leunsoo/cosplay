import type {
  ProductFormData,
  ShippingOption,
  DirectTradeOption,
  EconomyShippingOption,
} from './types';

export const INITIAL_FORM_DATA: ProductFormData = {
  title: '',
  price: 0,
  description: '',
  priceNegotiable: false,
  shippingType: 'included',
  standardShipping: 0,
  economyShipping: 'impossible',
  directTradeEnabled: 'possible',
  directTradeLocation: '',
  directTradePlace: '',
  mainImageFile: undefined,
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { value: 'included', label: '배송비포함' },
  { value: 'separate', label: '배송비별도' },
];

export const DIRECT_TRADE_OPTIONS: DirectTradeOption[] = [
  { value: 'possible', label: '가능' },
  { value: 'impossible', label: '불가' },
];

export const ECONOMY_SHIPPING_OPTIONS: EconomyShippingOption[] = [
  { value: 'possible', label: '가능' },
  { value: 'impossible', label: '불가' },
];

export const TITLE_MAX_LENGTH = 40;

// export const IMAGE_UPLOAD_INFO =
//   '상품 이미지는 640x640에 최적화 되어 있습니다. 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다. 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.';

export const DESCRIPTION_PLACEHOLDER =
  '구매 시기, 브랜드/모델명, 제품의 상태 (사용감, 하자 유무) 등을 입력해주시면 판매에 도움이 됩니다.';

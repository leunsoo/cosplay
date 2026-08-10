export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  priceNegotiable: boolean;
  shippingType: 'included' | 'separate';
  standardShipping: number;
  economyShipping: 'possible' | 'impossible';
  directTradeEnabled: 'possible' | 'impossible';
  directTradeLocation: string;
  directTradePlace: string;
  mainImageFile?: File;
}

export interface ShippingOption {
  value: 'included' | 'separate';
  label: string;
}

export interface DirectTradeOption {
  value: 'possible' | 'impossible';
  label: string;
}

export interface EconomyShippingOption {
  value: 'possible' | 'impossible';
  label: string;
}

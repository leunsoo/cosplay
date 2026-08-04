export interface SellerProfile {
  uuid: string;
  name: string;
  avatarUrl: string | null;
  introduction: string | null;
}

export interface Tab {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
}

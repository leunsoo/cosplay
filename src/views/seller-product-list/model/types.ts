import { User } from '@/entities/user';

export interface SellerProfile extends User {
  introduction: string | null;
}

export interface Tab {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
}

import { IAuditable } from '@/common/auditable/auditable.types';
import { IProduct } from '@/resources/products/types';
import { IUser } from '@/resources/users/types';

export interface IVendor extends IAuditable {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  isActive: boolean;
  settings?: Record<string, any>;
  products?: IProduct[];
  createdBy?: IUser;
  updatedBy?: IUser;
}

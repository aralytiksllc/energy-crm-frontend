// External

// Internal
import { ICustomer } from './customers';

export enum ContactStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IContact {
  id: number;

  name: string;

  type?: string;

  role?: string;

  phone?: string;

  email: string;

  status: ContactStatus;

  customerId: number;

  customer?: ICustomer;
}

// External

// Internal
import { Nullable } from './common';
import { ICustomer } from './customers';

export enum ContactStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IContact {
  id: number;

  name: string;

  type?: Nullable<string>;

  role?: Nullable<string>;

  phone?: Nullable<string>;

  email: string;

  status: ContactStatus;

  customerId: number;

  customer?: ICustomer;
}

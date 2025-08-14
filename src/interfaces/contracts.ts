export interface IContract {
  id: string;
  title: string;
  description?: string;
  customerId: string;
  customer?: IContractCustomer;
  startDate: string;
  endDate?: string;
  value: number;
  currency: string;
  status: ContractStatus;
  type: ContractType;
  terms?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContractCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export enum ContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum ContractType {
  SERVICE = 'service',
  PRODUCT = 'product',
  MAINTENANCE = 'maintenance',
  CONSULTING = 'consulting',
  LICENSING = 'licensing',
}

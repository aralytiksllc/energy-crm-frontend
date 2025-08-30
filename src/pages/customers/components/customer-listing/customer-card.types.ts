// External

// Internal
import type { ICustomer } from '@/interfaces/customers';

export interface CustomerItemProps {
  customer: ICustomer;

  isActive: boolean;

  onEdit: (id: number) => void;
}

// External

// Internal
import type { ICustomer } from '@/interfaces';

export interface CustomerItemProps {
  customer: ICustomer;

  isActive: boolean;

  onEdit: (id: number) => void;
}

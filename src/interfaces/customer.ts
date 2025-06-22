export interface ICustomer {
  id: number;
  createdById?: number;
  updatedById?: number;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  settings?: Record<string, unknown> | null;
  notes?: string | null;
  isActive: boolean;
}

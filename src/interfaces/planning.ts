import type { BaseRecord } from '@refinedev/core';

export interface IPlanningAssignment extends BaseRecord {
  id: number;
  userId: number;
  projectId: number;
  startDate: string;
  endDate?: string;
  allocatedHours: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  project?: {
    id: number;
    name: string;
    description?: string;
  };
}

import type { BaseRecord } from '@refinedev/core';

export interface IPlanning extends BaseRecord {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  notes?: string;
  assignedUserId: number;
  assignedUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  projectId: number;
  project: {
    id: number;
    name: string;
  };
  isCompleted: boolean;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlanningFormValues {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  notes?: string;
  assignedUserId: number;
  projectId: number;
  isCompleted?: boolean;
  completedDate?: string;
}

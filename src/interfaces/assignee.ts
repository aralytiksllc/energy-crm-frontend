export interface Assignee {
  id: number;
  userId: number;
  taskId: number;
  assignedAt: string;
  estimatedHours?: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

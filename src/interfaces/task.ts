export interface Task {
  id: number;
  title: string;
  description?: string;
  projectId: number;
  isCompleted: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: string;
  assignees?: any[];
  status?: string;
}

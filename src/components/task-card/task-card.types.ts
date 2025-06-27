import React from 'react';
import { TaskType } from '@interfaces/task-type.enum';
import { IUser } from '@interfaces/users';

export interface TaskAssignee {
  user?: IUser;
  userId: number;
  taskId: number;
  estimatedHours: number;
  actualHours: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  projectId: number;
  isCompleted: boolean;
  dueDate?: Date;
  createdAt: string;
  updatedAt: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  type: TaskType;
  assignees?: TaskAssignee[];
}

export interface TaskCardEditProps {
  task: Task;
  users?: IUser[];
  onSave?: (task: Task) => void;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
  editingField?: keyof Task | null;
  className?: string;
  style?: React.CSSProperties;
}

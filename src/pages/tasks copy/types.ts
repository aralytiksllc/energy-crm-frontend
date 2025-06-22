import type {
  TaskType,
  TaskPriority,
  User,
  TaskFormValues,
  TaskAssignee,
} from '@/components/task-form/task-form.types';

// Base entity interface
export interface BaseEntity {
  id: number;
  createdById?: number;
  updatedById?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Query system interfaces
export enum Operator {
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  LIKE = 'like',
  ILIKE = 'ilike',
  IN = 'in',
  RANGE = 'range',
}

export interface QueryFilter<T> {
  field: keyof T;
  operator: Operator;
  value: any;
}

export interface QuerySort<T> {
  field: keyof T;
  order: 'ASC' | 'DESC';
}

export interface QueryParams<T> {
  filters?: QueryFilter<T>[];
  sorters?: QuerySort<T>[];
  current?: number;
  pageSize?: number;
}

export interface Paged<T> {
  items: T[];
  total: number;
  current: number;
  pageSize: number;
}

export { TaskType, TaskPriority } from '@/components/task-form/task-form.types';

export interface CreateTaskProps {
  stageId: string;
  projectId?: number;
  onSuccess?: (values: TaskFormValues) => void;
  onCancel?: () => void;
  onError?: (error: Error) => void;
  showActions?: boolean;
  disabled?: boolean;
  loading?: boolean;
  showUserSelection?: boolean;
  autoSubmit?: boolean;
}

export interface EditTaskProps {
  taskId: number;
  initialData?: Partial<TaskFormValues> & {
    assignedTo?: number[];
    assignees?: TaskAssignee[];
  };
  onSuccess?: (values: TaskFormValues) => void;
  onCancel?: () => void;
  onError?: (error: Error) => void;
  showActions?: boolean;
  disabled?: boolean;
  loading?: boolean;
  showUserSelection?: boolean;
  autoSubmit?: boolean;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
}

// TaskAssigneeDto for API calls - matching backend exactly
export interface TaskAssigneeDto {
  userId: number;
  estimatedHours?: number;
  actualHours?: number;
}

// Task Entity - matching backend exactly
export interface Task extends BaseEntity {
  // Task-specific fields
  title: string;
  description?: string;
  type: TaskType;
  priority?: TaskPriority;
  dueDate?: Date;
  isCompleted: boolean;
  completedDate?: Date | null;
  projectId: number;
  project: Project;
  assignees: TaskAssignee[];
}

export interface Stage {
  id: string;
  name: string;
  ticketCount: number;
  tasks?: Task[];
  loading?: boolean;
  projectId: number;
}

// CreateTaskDto - matching backend exactly
export interface CreateTaskDto {
  title: string; // Required
  description?: string;
  type: TaskType; // Required
  priority?: TaskPriority;
  dueDate?: string; // ISO date string
  isCompleted?: boolean;
  completedDate?: string; // ISO date string
  projectId: number; // Required
  assignedToIds?: number[]; // Simple user IDs array
  assignees?: TaskAssigneeDto[]; // Detailed assignee info
}

// UpdateTaskDto - matching backend exactly
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  type?: TaskType;
  priority?: TaskPriority;
  dueDate?: string;
  isCompleted?: boolean;
  completedDate?: string;
  projectId?: number;
  assignedToIds?: number[];
  assignees?: TaskAssigneeDto[];
}

export interface CreateTaskInput extends CreateTaskDto {
  stageId?: string; // For Kanban board support
}

export interface UpdateTaskInput extends UpdateTaskDto {
  taskId: number;
  stageId?: string; // For Kanban board support
}

export interface EditTaskInput extends UpdateTaskDto {
  id: number;
}

// Query types for task filtering and pagination
export type TaskQueryParams = QueryParams<Task>;
export type TaskPagedResponse = Paged<Task>;

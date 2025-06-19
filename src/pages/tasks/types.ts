import type {
  TaskType,
  TaskPriority,
  User,
  TaskFormValues,
  TaskAssignee,
} from '@/components/task-form/task-form.types';

export { TaskType, TaskPriority } from '@/components/task-form/task-form.types';

export interface CreateTaskProps {
  stageId: string;
  projectId: number;
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
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: TaskType;
  priority?: TaskPriority;
  dueDate: Date;
  isCompleted: boolean;
  project: Project;
  assignedTo: User[];
  assignees?: TaskAssignee[];
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stage {
  id: string;
  name: string;
  ticketCount: number;
  tasks?: Task[];
  loading?: boolean;
  projectId: number;
}

export interface CreateTaskInput extends TaskFormValues {
  stageId: string;
  projectId: number;
  assignedTo?: number[];
}

export interface UpdateTaskInput {
  taskId: number;
  stageId?: string;
  assignedTo?: number[];
  data?: Partial<TaskFormValues>;
}

export interface EditTaskInput extends Partial<TaskFormValues> {
  id: number;
  assignedTo?: number[];
}

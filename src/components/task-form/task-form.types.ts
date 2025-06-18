import type { FormInstance } from 'antd/es/form';
import type { UploadFile } from 'antd';

export enum TaskType {
  EMAIL = 'EMAIL',
  MEETING = 'MEETING',
  PHONE_CALL = 'PHONE_CALL',
  OTHER = 'OTHER',
  TASK = 'TASK',
}

export enum TaskPriority {
  LOWEST = 'LOWEST',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  HIGHEST = 'HIGHEST',
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface TaskAssignee {
  userId: number;
  estimatedHours: number;
  user?: User;
}

export interface TaskFormValues {
  title: string;
  description?: string;
  type: TaskType;
  priority?: TaskPriority;
  dueDate?: Date;
  assignees?: TaskAssignee[];
  attachments?: UploadFile[];
}

export type TaskFormTab = 'overview' | 'attachments' | 'history' | 'comments';

export interface TaskFormProps {
  showUserSelection?: boolean;
  onUserSelect?: (userId: number) => void;
  selectedUsers?: number[];
  users?: User[];
  form?: FormInstance<TaskFormValues>;
  initialValues?: Partial<TaskFormValues>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  showCard?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onFinish?: (values: TaskFormValues) => void;
  activeTab?: TaskFormTab;
  onTabChange?: (tab: TaskFormTab) => void;
  showActions?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  renderAssigneeSection?: () => React.ReactNode;
  // Comments related props
  renderCommentsSection?: () => React.ReactNode;
  currentUser?: User;
  taskId?: string;
}

export const PRIORITY_OPTIONS = [
  { label: 'Lowest', value: TaskPriority.LOWEST, color: '#d9d9d9' },
  { label: 'Low', value: TaskPriority.LOW, color: '#52c41a' },
  { label: 'Medium', value: TaskPriority.MEDIUM, color: '#faad14' },
  { label: 'High', value: TaskPriority.HIGH, color: '#fa8c16' },
  { label: 'Highest', value: TaskPriority.HIGHEST, color: '#f5222d' },
];

import type { FormInstance } from 'antd/es/form';
import type { UploadFile } from 'antd';

export enum TaskType {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  CODE_REVIEW = 'CODE_REVIEW',
  TESTING = 'TESTING',
  DOCUMENTATION = 'DOCUMENTATION',
  REFACTOR = 'REFACTOR',
  MEETING = 'MEETING',
  DEPLOYMENT = 'DEPLOYMENT',
  RESEARCH = 'RESEARCH',
  OTHER = 'OTHER',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
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
  projectId?: number;
  assignees?: TaskAssignee[];
  attachments?: UploadFile[];
}

export type TaskFormTab = 'overview' | 'attachments' | 'history' | 'comments';

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: string;
  isActive: boolean;
}

export interface TaskFormProps {
  showUserSelection?: boolean;
  onUserSelect?: (userId: number) => void;
  selectedUsers?: number[];
  users?: User[];
  projects?: Project[];
  projectsLoading?: boolean;
  showProjectSelection?: boolean;
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
  { label: 'Low', value: TaskPriority.Low, color: '#52c41a' },
  { label: 'Medium', value: TaskPriority.Medium, color: '#faad14' },
  { label: 'High', value: TaskPriority.High, color: '#fa8c16' },
  { label: 'Critical', value: TaskPriority.Critical, color: '#f5222d' },
];

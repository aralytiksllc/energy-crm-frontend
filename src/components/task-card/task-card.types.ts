import { User } from '../task-form/task-form.types';
import { Task } from '../../pages/tasks/types';

export interface TaskCardProps {
  task: Task;
  users?: User[];
  onUpdate?: (updatedTask: Partial<Task>) => void;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  editMode?: boolean;
  onEditModeChange?: (editMode: boolean) => void;
}

export interface TaskCardViewProps {
  task: Task;
  onEdit?: () => void;
  onFieldEdit?: (field: keyof Task) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface TaskCardEditProps {
  task: Task;
  users?: User[];
  onSave?: (updatedTask: Partial<Task>) => void;
  onCancel?: () => void;
  disabled?: boolean;
  loading?: boolean;
  editingField?: keyof Task | null;
  className?: string;
  style?: React.CSSProperties;
}

export interface UserSelectorProps {
  value?: number[];
  onChange?: (value: number[]) => void;
  users?: User[];
  placeholder?: string;
  disabled?: boolean;
  mode?: 'single' | 'multiple';
  allowClear?: boolean;
  showSearch?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface EditableFieldProps {
  field: keyof Task;
  value: any;
  onChange: (value: any) => void;
  onSave: () => void;
  onCancel: () => void;
  editing: boolean;
  onEdit: () => void;
  disabled?: boolean;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'date' | 'select' | 'users';
  options?: any[];
  users?: User[];
}

import { TaskType, type User } from '@/components/task-form/task-form.types';

export const TASK_TYPE_COLORS: Record<TaskType, string> = {
  [TaskType.EMAIL]: 'blue',
  [TaskType.MEETING]: 'green',
  [TaskType.PHONE_CALL]: 'purple',
  [TaskType.OTHER]: 'default',
  [TaskType.TASK]: 'cyan',
};

export const TASK_TYPE_ICONS: Record<TaskType, string> = {
  [TaskType.EMAIL]: 'mail',
  [TaskType.MEETING]: 'calendar',
  [TaskType.PHONE_CALL]: 'phone',
  [TaskType.OTHER]: 'file',
  [TaskType.TASK]: 'check-circle',
};

export const TASK_FORM_DEFAULTS = {
  LAYOUT: 'vertical' as const,
  SHOW_CARD: false,
  SHOW_USER_SELECTION: true,
  AUTO_SUBMIT: false,
  SHOW_ACTIONS: true,
} as const;

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
  },
  {
    id: 4,
    name: 'Alice Brown',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
  },
];

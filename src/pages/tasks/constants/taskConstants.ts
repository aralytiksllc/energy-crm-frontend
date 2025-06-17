import { TaskType } from '../types';

export const TASK_TYPE_COLORS: Record<TaskType, string> = {
  [TaskType.EMAIL]: 'blue',
  [TaskType.MEETING]: 'green',
  [TaskType.PHONE_CALL]: 'purple',
  [TaskType.OTHER]: 'default',
};

export const TASK_TYPE_ICONS: Record<TaskType, string> = {
  [TaskType.EMAIL]: 'mail',
  [TaskType.MEETING]: 'calendar',
  [TaskType.PHONE_CALL]: 'phone',
  [TaskType.OTHER]: 'file',
};

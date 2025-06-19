import { TaskType } from '@/components/task-form/task-form.types';

export const TASK_TYPE_COLORS = {
  [TaskType.FEATURE]: 'green',
  [TaskType.BUG]: 'red',
  [TaskType.CODE_REVIEW]: 'orange',
  [TaskType.TESTING]: 'purple',
  [TaskType.DOCUMENTATION]: 'blue',
  [TaskType.REFACTOR]: 'gold',
  [TaskType.MEETING]: 'cyan',
  [TaskType.DEPLOYMENT]: 'magenta',
  [TaskType.RESEARCH]: 'lime',
  [TaskType.OTHER]: 'default',
};

export const TASK_TYPE_ICONS = {
  [TaskType.FEATURE]: 'plus-circle',
  [TaskType.BUG]: 'bug',
  [TaskType.CODE_REVIEW]: 'eye',
  [TaskType.TESTING]: 'experiment',
  [TaskType.DOCUMENTATION]: 'file-text',
  [TaskType.REFACTOR]: 'tool',
  [TaskType.MEETING]: 'calendar',
  [TaskType.DEPLOYMENT]: 'cloud-upload',
  [TaskType.RESEARCH]: 'search',
  [TaskType.OTHER]: 'question-circle',
};

export const TASK_FORM_DEFAULTS = {
  LAYOUT: 'vertical' as const,
  SHOW_CARD: false,
  SHOW_USER_SELECTION: true,
  AUTO_SUBMIT: false,
  SHOW_ACTIONS: true,
} as const;

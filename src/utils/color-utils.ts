import { COLORS } from '../styles/constants';

export const getPriorityColor = (priority?: string): string => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return COLORS.error;
    case 'medium':
      return COLORS.warning;
    case 'low':
      return COLORS.success;
    default:
      return 'default';
  }
};

export const getTypeColor = (type?: string): string => {
  switch (type?.toLowerCase()) {
    case 'bug':
      return COLORS.error;
    case 'feature':
      return COLORS.primary;
    case 'task':
      return COLORS.success;
    case 'enhancement':
      return COLORS.warning;
    case 'documentation':
      return COLORS.info;
    default:
      return 'default';
  }
};

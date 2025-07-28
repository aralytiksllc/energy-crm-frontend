export const DASHBOARD_CONSTANTS = {
  DEFAULT_DATE_FILTER: 'month',
  CARD_HEIGHT: 400,
  CONTENT_HEIGHT_OFFSET: 80,
  MAX_PROJECT_HOURS_DISPLAY: 5,
  UPCOMING_DEADLINES_DAYS: 7,
} as const;

export const PRIORITY_COLORS = {
  high: 'var(--color-priority-high)',
  medium: 'var(--color-priority-medium)',
  low: 'var(--color-priority-low)',
  default: 'var(--color-priority-default)',
} as const;

export const STAT_CARD_COLORS = {
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-error)',
} as const;

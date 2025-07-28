import { createStyles } from 'antd-style';

export const useManagerStatsCardsStyles = createStyles(() => ({
  calendarIcon: {
    fontSize: '24px',
    color: 'var(--color-primary)',
  },
  projectIcon: {
    fontSize: '24px',
    color: 'var(--color-success)',
  },
  clockIcon: {
    fontSize: '24px',
    color: 'var(--color-warning)',
  },
  checkIcon: {
    fontSize: '24px',
    color: 'var(--color-info)',
  },
  statValueTrendUp: {
    color: 'var(--color-trend-up) !important',
  },

  statValueTrendDown: {
    color: 'var(--color-trend-down) !important',
  },

  statValueNeutral: {
    color: 'var(--color-text-primary) !important',
  },
}));

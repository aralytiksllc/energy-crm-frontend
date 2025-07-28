import { createStyles } from 'antd-style';

export const useLegacyTicketStatsStyles = createStyles(() => ({
  column: {
    marginBottom: 16,
  },
  card: {
    height: '100%',
    '& .ant-card-body': {
      padding: '16px',
    },
  },
  statistic: {
    '& .ant-statistic-title': {
      fontSize: '12px',
      marginBottom: '8px',
      textAlign: 'center',
      fontWeight: 'normal',
    },
    '& .ant-statistic-content': {
      textAlign: 'center',
    },
    '& .ant-statistic-content-value': {
      fontSize: '19px',
    },
    '& .ant-statistic-content-suffix': {
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'var(--color-text-primary)',
    },
  },
}));

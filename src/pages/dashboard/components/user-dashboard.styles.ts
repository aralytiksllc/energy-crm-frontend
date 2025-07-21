import { createStyles } from 'antd-style';

export const useUserDashboardStyles = createStyles(() => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
  verticalSpace: {
    width: '100%',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlsSection: {
    display: 'flex',
    alignItems: 'center',
  },
  projectHoursValue: {
    color: 'var(--color-primary)',
    fontWeight: 'bold',
  },
}));

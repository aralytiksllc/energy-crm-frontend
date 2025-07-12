import { createStyles } from 'antd-style';

export const useUserDashboardStyles = createStyles(({ css }) => ({
  loadingContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  `,
  verticalSpace: css`
    width: 100%;
  `,
  headerRow: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  controlsSection: css`
    display: flex;
    align-items: center;
  `,
}));

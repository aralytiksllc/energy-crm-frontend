import { createStyles } from 'antd-style';

export const useDashboardStyles = createStyles(({ token, css }) => ({
  dashboardContainer: css`
    padding: 24px;
    min-height: 100vh;
    background: ${token.colorBgContainer};
  `,

  loadingContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  `,

  dashboardHeader: css`
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  `,

  dashboardTitle: css`
    margin-bottom: 8px !important;
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${token.colorTextHeading};
  `,

  statsRow: css`
    margin-bottom: 32px;
  `,

  statCard: css`
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    height: 160px;
    transition: all 0.1s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .ant-card-body {
      padding: 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .ant-statistic-title {
      font-size: 14px;
      margin-bottom: 8px;
      color: #8c8c8c;
      font-weight: 500;
    }

    .ant-statistic-content {
      margin-bottom: 8px;

      .ant-statistic-content-value {
        color: #262626;
        font-size: 28px;
        font-weight: bold;
      }

      .ant-statistic-content-suffix {
        color: #262626;
        font-size: 28px;
        font-weight: bold;
      }
    }
  `,

  statCardText: css`
    color: #8c8c8c;
    font-size: 12px;
    margin-top: 4px;
  `,

  chartCard: css`
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
    height: 100%;

    .ant-card-head {
      border-bottom: 1px solid ${token.colorBorderSecondary};
      padding: 16px 24px;
    }

    .ant-card-head-title {
      padding: 0;
    }

    .ant-card-body {
      padding: 20px 24px;
    }
  `,

  chartTitle: css`
    margin: 0;
    color: #262626;
    font-size: 16px;
    font-weight: 600;
  `,

  chartSubtitle: css`
    color: #8c8c8c;
    font-size: 14px;
    margin-top: 4px;
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    line-height: 1.4;
  `,

  contentCard: css`
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
    height: 100%;

    .ant-card-head {
      border-bottom: 1px solid ${token.colorBorderSecondary};
      padding: 16px 24px;
    }

    .ant-card-head-title {
      padding: 0;
    }

    .ant-card-body {
      padding: 24px;
    }
  `,

  projectNameCell: css`
    .project-name {
      font-weight: 600;
      color: #262626;
      font-size: 14px;
    }

    .customer-name {
      color: #8c8c8c;
      font-size: 12px;
      margin-top: 2px;
    }
  `,

  progressCell: css`
    .task-count {
      font-size: 12px;
      color: #595959;
      margin-bottom: 4px;
    }

    .ant-progress {
      margin-bottom: 0;
    }
  `,

  hoursCell: css`
    .hours-row {
      font-size: 12px;
      margin-bottom: 2px;

      .hours-label {
        color: #8c8c8c;
      }

      .hours-value {
        font-weight: 600;
        color: #262626;
      }
    }
  `,

  filterButton: css`
    align-self: flex-start;
  `,

  chartsSection: css`
    margin-bottom: 32px;
  `,

  tableSection: css`
    margin-bottom: 32px;
  `,

  performerItem: css`
    padding: 12px;
    border-radius: 8px;
    background: ${token.colorFillAlter};
    transition: all 0.1s ease;

    &:hover {
      background: ${token.colorFillSecondary};
    }
  `,

  timelineItem: css`
    .ant-space {
      margin-bottom: 8px;
    }
  `,

  progressContainer: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  progressText: css`
    min-width: 60px;
    text-align: right;
    font-weight: 500;
  `,

  // Icon colors
  iconBlue: css`
    color: #1890ff;
  `,

  iconGreen: css`
    color: #52c41a;
  `,

  iconYellow: css`
    color: #faad14;
  `,

  iconCyan: css`
    color: #13c2c2;
  `,

  // Dark mode adjustments
  '@media (prefers-color-scheme: dark)': {
    statCard: css`
      background: ${token.colorBgElevated};
      border-color: ${token.colorBorderSecondary};
    `,

    chartCard: css`
      background: ${token.colorBgElevated};
      border-color: ${token.colorBorderSecondary};
    `,

    contentCard: css`
      background: ${token.colorBgElevated};
      border-color: ${token.colorBorderSecondary};

      .ant-card-head {
        background: ${token.colorBgLayout};
      }
    `,

    performerItem: css`
      background: ${token.colorBgLayout};

      &:hover {
        background: ${token.colorBgSpotlight};
      }
    `,
  },
}));

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
    background: var(--color-bg-white);
    border: 1px solid var(--color-border);
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
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .ant-statistic-content {
      margin-bottom: 8px;

      .ant-statistic-content-value {
        color: var(--color-text-primary);
        font-size: 28px;
        font-weight: bold;
      }

      .ant-statistic-content-suffix {
        color: var(--color-text-primary);
        font-size: 28px;
        font-weight: bold;
      }
    }
  `,

  statCardText: css`
    color: var(--color-text-secondary);
    font-size: 12px;
    margin-top: 4px;
  `,

  chartCard: css`
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid var(--color-border);
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
    color: var(--color-text-primary);
    font-size: 16px;
    font-weight: 600;
  `,

  chartSubtitle: css`
    color: var(--color-text-secondary);
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
    border: 1px solid var(--color-border);
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
      color: var(--color-text-primary);
      font-size: 14px;
    }

    .customer-name {
      color: var(--color-text-secondary);
      font-size: 12px;
      margin-top: 2px;
    }
  `,

  progressCell: css`
    .task-count {
      font-size: 12px;
      color: var(--color-text-light);
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
        color: var(--color-text-secondary);
      }

      .hours-value {
        font-weight: 600;
        color: var(--color-text-primary);
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
    color: var(--color-primary);
  `,

  iconGreen: css`
    color: var(--color-success);
  `,

  iconYellow: css`
    color: var(--color-warning);
  `,

  iconCyan: css`
    color: var(--color-info);
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

  hideChartTopLine: css`
    & .recharts-cartesian-grid-horizontal line:first-of-type {
      stroke-opacity: 0;
    }
  `,

  fullWidth: css`
    width: 100%;
  `,

  statIcon: css`
    font-size: 32px;
  `,

  statIconPrimary: css`
    color: var(--color-primary);
  `,

  statIconSuccess: css`
    color: var(--color-success);
  `,

  statIconWarning: css`
    color: var(--color-warning);
  `,

  statIconInfo: css`
    color: var(--color-info);
  `,

  legendWrapper: css`
    display: flex;
    justify-content: center;
    gap: 16px;
    padding-bottom: 20px;
  `,

  legendItem: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  legendColorBox: css`
    width: 12px;
    height: 12px;
  `,

  legendLabel: css`
    font-size: 14px;
    font-weight: bold;
  `,

  barChartLabel: css`
    color: var(--color-text-primary);
    font-weight: 600;
    font-size: 11px;
    text-align: left;
  `,

  spinnerContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  `,
  statValueTrendUp: css`
    color: var(--color-trend-up) !important;
  `,

  statValueTrendDown: css`
    color: var(--color-trend-down) !important;
  `,

  statValuePrimary: css`
    color: var(--color-primary) !important;
  `,

  statValueSuccess: css`
    color: var(--color-success) !important;
  `,

  statValueTesting: css`
    color: var(--color-task-testing) !important;
  `,

  legendColorBoxEnhanced: css`
    width: 12px;
    height: 12px;
    border-radius: 2px;
  `,

  chartContainer: css`
    height: 300px;
    width: 100%;
  `,

  scrollableContainer: css`
    overflow-y: auto;
    overflow-x: hidden;
  `,

  scrollableContent: css`
    padding-right: 8px;
  `,

  tagWithColor: css`
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 500;
  `,

  smallText: css`
    font-size: 12px;
  `,

  pipelineStage: css`
    padding: 8px 16px;
    border-radius: 6px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  pipelineStageName: css`
    font-weight: 500;
    font-size: 14px;
  `,

  taskProgressCard: css`
    padding: 16px;
    border-radius: 8px;
    background: var(--color-bg-white);
    border: 1px solid var(--color-border);
  `,

  taskProgressGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 16px;
  `,

  taskProgressItem: css`
    text-align: center;
    padding: 12px 8px;
    border-radius: 6px;
    background: var(--color-bg-layout);
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-bg-spotlight);
    }
  `,

  taskProgressNumber: css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 4px;
  `,

  taskProgressLabel: css`
    font-size: 12px;
    color: var(--color-text-secondary);
    line-height: 1.2;
  `,
}));

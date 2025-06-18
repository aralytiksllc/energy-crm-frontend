import { createStyles } from 'antd-style';

export const useActivityHistoryStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 100%;
    padding: 16px 0;
  `,

  timeline: css`
    margin-top: 16px;

    .ant-timeline-item-tail {
      border-left-color: ${token.colorBorderSecondary};
    }
  `,

  timelineIcon: css`
    color: ${token.colorTextSecondary};
  `,

  activityItem: css`
    margin-left: 12px;
    margin-bottom: 16px;
  `,

  activityContent: css`
    width: 100%;
  `,

  activityHeader: css`
    width: 100%;
    flex-wrap: wrap;
  `,

  userAvatar: css`
    flex-shrink: 0;
  `,

  userName: css`
    font-size: 14px;
    color: ${token.colorText};
  `,

  actionTag: css`
    font-size: 11px;
    border-radius: 10px;
    margin: 0;
  `,

  timestamp: css`
    font-size: 12px;
    margin-left: auto;
  `,

  description: css`
    font-size: 13px;
    color: ${token.colorTextSecondary};
    line-height: 1.4;
    margin-left: 32px;
  `,

  emptyState: css`
    text-align: center;
    padding: 32px 16px;
    color: ${token.colorTextTertiary};
  `,
}));

import { createStyles } from 'antd-style';

export const useGenericTabsStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 100%;
    height: 100%;

    .ant-tabs-content-holder {
      padding: ${token.padding}px;
    }

    .ant-tabs-tab {
      border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;
      transition: all ${token.motionDurationSlow};

      &:hover {
        color: ${token.colorPrimary};
      }
    }

    .ant-tabs-tab-active {
      background: ${token.colorBgContainer};
      border-color: ${token.colorBorder};

      .ant-tabs-tab-btn {
        color: ${token.colorPrimary};
        font-weight: 600;
      }
    }

    .ant-tabs-content {
      background: ${token.colorBgContainer};
      border-radius: 0 ${token.borderRadius}px ${token.borderRadius}px
        ${token.borderRadius}px;
      min-height: 300px;
    }
  `,

  cardStyle: css`
    .ant-tabs-card .ant-tabs-tab {
      background: ${token.colorFillAlter};
      border: 1px solid ${token.colorBorder};

      &:hover {
        background: ${token.colorFillSecondary};
      }
    }

    .ant-tabs-card .ant-tabs-tab-active {
      background: ${token.colorBgContainer};
      border-bottom-color: ${token.colorBgContainer};
    }
  `,

  lineStyle: css`
    .ant-tabs-line .ant-tabs-ink-bar {
      background: ${token.colorPrimary};
      height: 3px;
    }

    .ant-tabs-line .ant-tabs-tab {
      border: none;

      &:hover {
        background: ${token.colorFillAlter};
      }
    }
  `,

  compactSize: css`
    .ant-tabs-tab {
      padding: 8px 12px;
      font-size: 14px;
    }
  `,

  largeSize: css`
    .ant-tabs-tab {
      padding: 16px 24px;
      font-size: 16px;
    }
  `,
}));

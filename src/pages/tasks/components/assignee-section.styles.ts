import { createStyles } from 'antd-style';

export const useAssigneeSectionStyles = createStyles(({ token, css }) => ({
  displayContainer: css`
    gap: 8px;
  `,

  summaryText: css`
    font-size: 12px;
  `,

  expandedContent: css`
    width: 100%;
  `,

  sectionTitle: css`
    font-size: 14px;
  `,

  assigneeList: css`
    width: 100%;
    gap: 12px;
  `,

  assigneeCard: css`
    background-color: ${token.colorFillAlter};
    border: 1px solid ${token.colorBorderSecondary};

    .ant-card-body {
      padding: 12px;
    }

    .ant-row {
      align-items: center;
    }
  `,

  userSelect: css`
    width: 100%;

    .ant-select-selector {
      border-radius: 6px;
    }
  `,

  userOption: css`
    gap: 8px;
  `,

  hoursInput: css`
    width: 100%;

    .ant-input-number-input {
      text-align: center;
      border-radius: 6px;
    }
  `,

  removeButton: css`
    color: ${token.colorTextTertiary};

    &:hover {
      color: ${token.colorError};
      background-color: ${token.colorErrorBg};
    }
  `,

  addButton: css`
    width: 100%;
    border-style: dashed;
    border-color: ${token.colorBorder};
    color: ${token.colorTextSecondary};

    &:hover {
      border-color: ${token.colorPrimary};
      color: ${token.colorPrimary};
    }
  `,

  assigneeInfo: css`
    font-size: 12px;
    color: ${token.colorTextSecondary};
    font-weight: 500;
  `,
}));

import { createStyles } from 'antd-style';

export const useEditTaskStyles = createStyles(({ token, css }) => ({
  editTaskCard: css`
    .ant-card-body {
      padding: 24px;
    }
  `,

  assigneeDisplay: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: ${token.colorFillAlter};
    border-radius: 6px;
    border: 1px solid ${token.colorBorderSecondary};
  `,

  assigneeSummary: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,

  assigneeCount: css`
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  `,

  totalHours: css`
    font-size: 11px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  assigneeFormSection: css`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,

  formItem: css`
    margin-bottom: 16px;
  `,

  typeSelect: css`
    .ant-select-selector {
      height: 40px !important;
      border-radius: 6px;
    }
  `,

  titleInput: css`
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;

    &:focus {
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  datePicker: css`
    width: 100%;
    border-radius: 6px;

    .ant-picker-input input {
      font-size: 14px;
    }

    &:hover {
      border-color: ${token.colorPrimary};
    }

    &.ant-picker-focused {
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  actionsCard: css`
    margin-top: 24px;

    .ant-card-body {
      padding: 16px 24px;
    }
  `,

  actionsContainer: css`
    gap: 12px;
  `,

  updateButton: css`
    background: ${token.colorPrimary};
    border-color: ${token.colorPrimary};

    &:hover {
      background: ${token.colorPrimaryHover} !important;
      border-color: ${token.colorPrimaryHover} !important;
    }
  `,

  cancelButton: css`
    &:hover {
      border-color: ${token.colorPrimary};
      color: ${token.colorPrimary};
    }
  `,

  toolbar: css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 8px 0;
  `,

  toolbarLabel: css`
    font-size: 14px;
    font-weight: 500;
    color: ${token.colorText};
  `,

  toolbarActions: css`
    margin-left: auto;
  `,

  formContainer: css`
    width: 100%;
  `,
}));

import { createStyles } from 'antd-style';

export const useCreateTaskStyles = createStyles(({ token, css }) => ({
  createTaskCard: css`
    border-radius: 8px;
    border: none;
    box-shadow: none;

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

    .ant-form-item-label > label {
      font-weight: 500;
      color: ${token.colorText};
    }
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

  richTextEditor: css`
    border: 1px solid ${token.colorBorder};
    border-radius: 6px;
    background: ${token.colorBgContainer};
    overflow: hidden;

    &:hover {
      border-color: ${token.colorPrimary};
    }

    &:focus-within {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
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

  descriptionTextarea: css`
    padding: 12px;
    min-height: 100px;
    resize: none;
    border: none;
    box-shadow: none;

    &:focus {
      border: none;
      box-shadow: none;
    }

    &::placeholder {
      color: ${token.colorTextPlaceholder};
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

  userSelector: css`
    .ant-select-selector {
      border-radius: 6px;
      min-height: 40px;
      padding: 4px 8px;

      &:hover {
        border-color: ${token.colorPrimary};
      }
    }

    &.ant-select-focused .ant-select-selector {
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }

    .ant-select-selection-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      background: ${token.colorFillTertiary};
      border-radius: 4px;
      margin-right: 4px;

      .ant-avatar {
        flex-shrink: 0;
      }
    }
  `,

  cancelButton: css`
    border-radius: 6px;
    height: 40px;
    padding: 0 20px;
    border: 1px solid ${token.colorBorder};

    &:hover {
      border-color: ${token.colorPrimary};
      color: ${token.colorPrimary};
    }
  `,

  createButton: css`
    background: ${token.colorPrimary};
    border-color: ${token.colorPrimary};

    &:hover {
      background: ${token.colorPrimaryHover} !important;
      border-color: ${token.colorPrimaryHover} !important;
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

  formContainer: css`
    width: 100%;
  `,

  emptyCommentsSection: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    text-align: center;
    background: ${token.colorFillAlter};
    border-radius: 8px;
    border: 1px dashed ${token.colorBorder};
  `,
}));

import { createStyles } from 'antd-style';

export const useTaskFormStyles = createStyles(({ token, css }) => ({
  card: css`
    .ant-card-body {
      padding: 24px;
    }
  `,

  formContainer: css`
    width: 100%;

    &.collapsible-mode {
      gap: 12px;
    }

    &.standard-mode {
      gap: 16px;
    }
  `,

  collapsibleField: css`
    margin-bottom: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      border-color: ${token.colorPrimary};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .ant-card-body {
      padding: 16px;
    }
  `,

  expandedField: css`
    border-color: ${token.colorPrimary};
    box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    cursor: default;

    &:hover {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  fieldLabel: css`
    gap: 8px;
  `,

  labelText: css`
    font-size: 14px;
    font-weight: 500;
  `,

  fieldValue: css`
    font-size: 14px;
  `,

  placeholderText: css`
    font-size: 14px;
  `,

  expandedFieldContent: css`
    width: 100%;
  `,

  fieldTitle: css`
    font-size: 14px;
  `,

  formItem: css`
    margin: 0;
  `,

  titleInput: css`
    border-radius: 6px;
    padding: 12px;
    font-size: 16px;
    font-weight: 500;

    &:focus {
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  descriptionTextarea: css`
    resize: none;
    border-radius: 6px;

    &:focus {
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  datePicker: css`
    width: 100%;
    border-radius: 6px;
    padding: 12px;

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

  typeDisplay: css`
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;

    &.email {
      background: #e6f7ff;
      color: #1890ff;
    }

    &.meeting {
      background: #f6ffed;
      color: #52c41a;
    }

    &.phone_call {
      background: #fff7e6;
      color: #faad14;
    }

    &.other {
      background: #f5f5f5;
      color: #8c8c8c;
    }

    &.task {
      background: #f9f0ff;
      color: #722ed1;
    }
  `,

  typeSelect: css`
    .ant-select-selector {
      height: 40px !important;
      border-radius: 6px;
    }
  `,

  assigneeSection: css`
    width: 100%;
  `,

  avatarGroup: css`
    margin-top: 8px;
    .ant-avatar {
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }
  `,

  avatarSelected: css`
    border: 2px solid var(--color-avatar-blue) !important;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
  `,

  avatarClickable: css`
    cursor: pointer;
    opacity: 1;

    &:hover {
      transform: scale(1.1);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `,

  selectedCount: css`
    font-size: 12px;
    font-weight: 500;
  `,

  fieldSelect: css`
    width: 100%;
    border-radius: 6px;

    .ant-select-selector {
      border-radius: 6px;
      padding: 8px 12px;
    }

    &:hover .ant-select-selector {
      border-color: ${token.colorPrimary};
    }

    &.ant-select-focused .ant-select-selector {
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  priorityTag: css`
    border-radius: 4px;
    font-size: 12px;
    line-height: 1;
    padding: 2px 4px;
    margin-right: 4px;
  `,

  tabContent: css`
    padding: 24px 0;
    min-height: 250px;
    background: ${token.colorBgContainer};
    border-radius: 8px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -24px;
      right: -24px;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        ${token.colorBorderSecondary} 20%,
        ${token.colorBorderSecondary} 80%,
        transparent 100%
      );
    }
  `,

  formHeader: css`
    margin-bottom: 32px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  tabSegmented: css`
    .ant-segmented-item {
      &:hover {
        color: ${token.colorPrimary};
      }

      &.ant-segmented-item-selected {
        background: ${token.colorPrimary};
        color: ${token.colorWhite};
      }
    }
  `,

  form: css`
    width: 100%;
    border: none;

    .ant-form-item-label > label {
      font-weight: 500;
      color: ${token.colorTextHeading};
    }

    .ant-form-item {
      margin-bottom: 16px;
    }
  `,

  actionContainer: css`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 24px;
    border-top: 1px solid ${token.colorBorderSecondary};
    margin-top: 24px;
  `,

  actionButton: css`
    height: 40px;
    padding: 0 20px;
    border-radius: 6px;
    font-weight: 500;
  `,

  cancelButton: css`
    border: 1px solid ${token.colorBorder};
    color: ${token.colorText};

    &:hover {
      border-color: ${token.colorPrimary};
      color: ${token.colorPrimary};
    }
  `,

  saveButton: css`
    background: ${token.colorPrimary};
    border-color: ${token.colorPrimary};
    color: ${token.colorWhite};

    &:hover {
      background: ${token.colorPrimaryHover} !important;
      border-color: ${token.colorPrimaryHover} !important;
    }
  `,

  emptyState: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    color: ${token.colorTextTertiary};
  `,
}));

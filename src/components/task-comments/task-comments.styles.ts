import { createStyles } from 'antd-style';

export const useTaskCommentsStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 100%;
    padding: 16px 0;
  `,

  inputCard: css`
    background: ${token.colorFillAlter};
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: 8px;
    margin-bottom: 16px;

    .ant-card-body {
      padding: 16px;
    }
  `,

  inputContainer: css`
    width: 100%;
    gap: 12px;
  `,

  inputHeader: css`
    width: 100%;
    align-items: flex-start;
    gap: 12px;
  `,

  currentUserAvatar: css`
    flex-shrink: 0;
    margin-top: 4px;
  `,

  inputWrapper: css`
    flex: 1;
    width: 100%;
  `,

  commentInput: css`
    width: 100%;
    border-radius: 6px;
    border: 1px solid ${token.colorBorder};
    transition: all 0.2s;

    &:hover {
      border-color: ${token.colorPrimary};
    }

    &:focus,
    &.ant-input-focused {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }

    .ant-input {
      resize: none;
    }
  `,

  inputActions: css`
    display: flex;
    justify-content: flex-end;
    padding-top: 8px;
  `,

  submitButton: css`
    height: 36px;
    padding: 0 16px;
    border-radius: 6px;
    font-weight: 500;
  `,

  divider: css`
    margin: 16px 0;
    border-color: ${token.colorBorderSecondary};
  `,

  commentsList: css`
    .ant-list-item {
      padding: 16px 0;
      border-bottom: 1px solid ${token.colorBorderSecondary};

      &:last-child {
        border-bottom: none;
      }
    }
  `,

  commentItem: css`
    background: transparent;
    transition: all 0.2s;

    &:hover {
      background: ${token.colorFillAlter};
      border-radius: 8px;
      padding: 16px !important;
      margin: 0 -16px;
    }
  `,

  authorAvatar: css`
    flex-shrink: 0;
  `,

  commentHeader: css`
    margin-bottom: 4px;
    gap: 8px;
    flex-wrap: wrap;
  `,

  authorName: css`
    font-size: 14px;
    color: ${token.colorTextHeading};
  `,

  timestamp: css`
    font-size: 12px;
    color: ${token.colorTextTertiary};
  `,

  editedLabel: css`
    font-size: 11px;
    font-style: italic;
    color: ${token.colorTextQuaternary};
  `,

  commentContent: css`
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: ${token.colorText};
    white-space: pre-wrap;
    word-wrap: break-word;
  `,

  actionButton: css`
    color: ${token.colorTextTertiary};
    border: none;
    padding: 4px;
    height: auto;
    min-width: 24px;
    border-radius: 4px;

    &:hover {
      color: ${token.colorPrimary};
      background: ${token.colorPrimaryBg};
    }

    &:focus {
      color: ${token.colorPrimary};
      background: ${token.colorPrimaryBg};
    }
  `,

  deleteButton: css`
    &:hover {
      color: ${token.colorError} !important;
      background: ${token.colorErrorBg} !important;
    }

    &:focus {
      color: ${token.colorError} !important;
      background: ${token.colorErrorBg} !important;
    }
  `,

  editContainer: css`
    width: 100%;
    margin-top: 8px;
  `,

  editTextArea: css`
    width: 100%;
    border-radius: 6px;
    margin-bottom: 8px;

    &:hover {
      border-color: ${token.colorPrimary};
    }

    &:focus,
    &.ant-input-focused {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px ${token.colorPrimary}20;
    }
  `,

  editActions: css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  `,

  cancelButton: css`
    height: 32px;
    padding: 0 12px;
    border-radius: 4px;
    font-size: 12px;
    color: ${token.colorTextSecondary};
    border: 1px solid ${token.colorBorder};

    &:hover {
      color: ${token.colorText};
      border-color: ${token.colorPrimary};
    }
  `,

  saveButton: css`
    height: 32px;
    padding: 0 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  `,

  emptyState: css`
    padding: 40px 20px;
    text-align: center;

    .ant-empty-description {
      color: ${token.colorTextTertiary};
      font-size: 14px;
    }
  `,
}));

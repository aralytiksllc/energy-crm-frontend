import { createStyles } from 'antd-style';

export const useTaskCardStyles = createStyles(({ token, css }) => ({
  taskCard: css`
    .ant-card-body {
      padding: 16px;
    }

    .editable-field {
      transition: background-color 0.2s ease;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: ${token.colorFillTertiary};
      }
    }

    .task-type-tag {
      margin: 0;
      font-size: 12px;
      font-weight: 500;
    }

    .task-title {
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.4;
    }

    .task-description {
      margin: 0 0 16px 0;
      color: ${token.colorTextSecondary};
      line-height: 1.5;
      min-height: 20px;
    }

    .task-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .task-meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px;
      border-radius: 4px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${token.colorFillTertiary};
      }
    }

    .user-avatars {
      display: flex;
      gap: 4px;
    }

    .rich-text-editor {
      border: 1px solid ${token.colorBorder};
      border-radius: 6px;
      background: ${token.colorBgContainer};

      .toolbar {
        border-bottom: 1px solid ${token.colorBorderSecondary};
        padding: 8px 12px;
        display: flex;
        gap: 8px;

        .toolbar-divider {
          width: 1px;
          height: 20px;
          background: ${token.colorBorderSecondary};
          margin: 0 4px;
        }
      }

      .editor-content {
        padding: 12px;
        min-height: 100px;

        .ant-input {
          border: none;
          box-shadow: none;
          padding: 0;
          resize: none;

          &:focus {
            border: none;
            box-shadow: none;
          }
        }
      }
    }

    .edit-actions {
      margin-top: 8px;
      display: flex;
      gap: 8px;
    }

    .global-actions {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid ${token.colorBorderSecondary};
    }
  `,

  userSelector: css`
    .ant-select-selection-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      background: ${token.colorFillTertiary};
      border-radius: 4px;
      margin-right: 4px;

      .user-avatar {
        flex-shrink: 0;
      }

      .user-name {
        font-size: 12px;
        color: ${token.colorText};
      }

      .remove-user {
        margin-left: 4px;
        cursor: pointer;
        font-size: 10px;
        color: ${token.colorTextSecondary};

        &:hover {
          color: ${token.colorError};
        }
      }
    }

    .ant-select-dropdown {
      .option-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;

        .user-avatar {
          flex-shrink: 0;
        }

        .user-name {
          color: ${token.colorText};
        }
      }
    }
  `,

  taskCardView: css`
    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .edit-icon {
      cursor: pointer;
      color: ${token.colorTextTertiary};
      transition: color 0.2s ease;

      &:hover {
        color: ${token.colorPrimary};
      }
    }
  `,

  taskCardEdit: css`
    .field-editor {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .field-actions {
      margin-top: 8px;
      display: flex;
      gap: 8px;
    }

    .toolbar-button {
      padding: 2px 8px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s ease;

      &:hover {
        background: ${token.colorFillTertiary};
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  `,

  selectedCount: css`
    font-size: 12px;
    font-weight: 500;
  `,

  userTag: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    background-color: ${token.colorFillAlter};
    border-radius: 4px;
    margin-right: 4px;
  `,

  userTagText: css`
    font-size: 12px;
  `,

  userTagClose: css`
    margin-left: 4px;
    cursor: pointer;
    font-size: 10px;

    &:hover {
      color: ${token.colorError};
    }
  `,
}));

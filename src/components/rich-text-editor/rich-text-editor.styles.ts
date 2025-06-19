import { createStyles } from 'antd-style';

interface StyleParams {
  height?: number;
}

export const useRichTextEditorStyles = createStyles(
  ({ token, css }, { height = 200 }: StyleParams = {}) => ({
    container: css`
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
      border-bottom: 1px solid ${token.colorBorderSecondary};
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: ${token.colorFillTertiary};
      flex-wrap: wrap;
    `,

    toolbarButton: css`
      border: none;
      box-shadow: none;
      height: 28px;
      padding: 0 8px;
      border-radius: 4px;
      font-size: 12px;

      &:hover {
        background: ${token.colorFillSecondary};
      }

      &:disabled {
        opacity: 0.5;
      }
    `,

    divider: css`
      height: 20px;
      margin: 0 4px;
    `,

    textArea: css`
      border: none !important;
      box-shadow: none !important;
      padding: 12px;
      resize: none;

      &:focus {
        border: none !important;
        box-shadow: none !important;
      }

      &::placeholder {
        color: ${token.colorTextPlaceholder};
      }
    `,

    editor: css`
      border: none;

      .ql-container {
        border: none;
        height: ${height}px;
        font-family: ${token.fontFamily};
      }

      .ql-editor {
        min-height: ${height}px;
        height: ${height}px;
        padding: 12px 16px;
        line-height: 1.6;
        color: ${token.colorText};
        overflow-y: auto;

        &.ql-blank::before {
          color: ${token.colorTextPlaceholder};
          font-style: normal;
        }
      }

      .ql-toolbar {
        border: none;
        border-bottom: 1px solid ${token.colorBorder};
        padding: 8px 12px;
        background-color: ${token.colorFillAlter};
      }
    `,
  }),
);

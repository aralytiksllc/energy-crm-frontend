import { createStyles } from 'antd-style';

export const useGenericModalStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 100%;
  `,

  tabsContainer: css`
    margin-bottom: 24px;
    padding: 0 16px;
  `,

  tabSegmented: css`
    display: flex;
    width: 100%;

    .ant-segmented-item {
      flex: 1;
      text-align: center;
    }
  `,

  tabContent: css`
    padding: 0 16px;
    min-height: 200px;
  `,

  form: css`
    width: 100%;
  `,

  buttonContainer: css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,

  button: css`
    min-width: 80px;
  `,

  cancelButton: css`
    border-color: ${token.colorBorder};
    color: ${token.colorText};

    &:hover {
      border-color: ${token.colorPrimary};
      color: ${token.colorPrimary};
    }
  `,

  submitButton: css`
    background-color: ${token.colorPrimary};
    border-color: ${token.colorPrimary};

    &:hover {
      background-color: ${token.colorPrimaryHover};
      border-color: ${token.colorPrimaryHover};
    }
  `,
}));

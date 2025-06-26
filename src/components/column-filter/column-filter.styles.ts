import { createStyles } from 'antd-style';

export const useColumnFilterStyles = createStyles(({ css }) => ({
  container: css`
    padding: 8px;
  `,
  input: css`
    min-width: 120px;
  `,
  buttonsContainer: css`
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `,
}));

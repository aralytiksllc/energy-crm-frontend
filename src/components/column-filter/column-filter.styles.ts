import { createStyles } from 'antd-style';

export const useColumnFilterStyles = createStyles(({ css }) => ({
  container: css`
    padding: 12px;
    min-width: 200px;
  `,
  input: css`
    min-width: 180px;
    margin-bottom: 8px;
  `,
  fullWidth: css`
    width: 100%;
  `,
  operatorSelect: css`
    width: 120px;
  `,
}));

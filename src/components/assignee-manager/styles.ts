import { createStyles } from 'antd-style';

export const useAssigneeManagerStyles = createStyles(({ css }) => ({
  container: css`
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 16px;
    background-color: #fafafa;
    margin-bottom: 16px;
  `,
  header: css`
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  `,
  row: css`
    margin-bottom: 8px;
  `,
  fullWidth: css`
    width: 100%;
  `,
  removeButtonCol: css`
    text-align: center;
  `,
  addButton: css`
    padding-left: 0;
    margin-top: 8px;
  `,
}));

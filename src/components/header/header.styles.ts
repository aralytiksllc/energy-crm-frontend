import { createStyles } from 'antd-style';

export const useHeaderStyles = createStyles(({ token, css }) => ({
  header: css`
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  `,
}));

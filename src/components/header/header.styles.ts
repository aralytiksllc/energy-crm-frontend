import { createStyles } from 'antd-style';

export const useHeaderStyles = createStyles(({ token, css }) => ({
  header: css`
    background: ${token.colorBgContainer};
    padding: 0 24px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 10;
  `,

  leftSection: css`
    margin-left: 8px;
  `,

  logoContainer: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  title: css`
    font-size: 18px;
    font-weight: 600;
    color: ${token.colorText};
    margin: 0;
  `,
}));

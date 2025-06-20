import { createStyles } from 'antd-style';

export const useClientOptionStyles = createStyles(({ token, css }) => ({
  container: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    width: 100%;
    overflow: hidden;
  `,

  compactContainer: css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2px 0;
    width: 100%;
    overflow: hidden;
  `,

  avatar: css`
    flex-shrink: 0;
  `,

  content: css`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  `,

  name: css`
    font-weight: 500;
    color: ${token.colorText};
    font-size: 14px;
    line-height: 1.2;
  `,

  email: css`
    color: ${token.colorTextSecondary};
    font-size: 12px;
    line-height: 1.2;
  `,
}));

import { createStyles } from 'antd-style';

export const useGenericModalStyles = createStyles(({ css, token }) => ({
  modalHeader: css`
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 16px;
    margin-bottom: 24px;
  `,
  modalBody: css`
    padding: 5px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  tabsContainer: css`
    padding: 0 16px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  tabSegmented: css`
    width: 100%;
  `,
  tabContent: css`
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  `,
  form: css`
    height: 100%;
  `,
}));

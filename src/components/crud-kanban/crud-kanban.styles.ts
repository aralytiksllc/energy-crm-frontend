import { createStyles } from 'antd-style';

export const useCrudKanbanStyles = createStyles(({ css, token }) => ({
  actions: css`
    margin-top: ${token.marginSM}px;
  `,
}));

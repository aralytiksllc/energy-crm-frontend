import { createStyles } from 'antd-style';

export const useKanbanBoardStyles = createStyles(({ css }) => ({
  container: css`
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 24px;
    padding: 0 16px;
  `,
  boardContainer: css`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f5f6fa;
    border-radius: 12px;
  `,
}));

import { createStyles } from 'antd-style';

export const useKanbanColumnStyles = createStyles(
  ({ css }, props: { isOver: boolean }) => ({
    container: css`
      background: #f0f2f5;
      border-radius: 8px;
      min-width: 260px;
      padding: 12px;
      border: ${props.isOver ? '2px dashed #1677ff' : '2px solid transparent'};
      display: flex;
      flex-direction: column;
    `,
    header: css`
      margin-bottom: 8px;
    `,
    content: css`
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      flex: 1;
    `,
  }),
);

import { createStyles } from 'antd-style';

export const useKanbanColumnStyles = createStyles(
  ({ css }, { isOver, active }: { isOver: boolean; active: boolean }) => ({
    container: css`
      display: flex;
      flex-direction: column;
      padding: 0 16px;
    `,
    header: css`
      padding: 12px;
    `,
    headerSpace: css`
      width: 100%;
      justify-content: space-between;
    `,
    title: css`
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
      white-space: nowrap;
    `,
    content: css`
      flex: 1;
      overflow-y: ${active ? 'unset' : 'auto'};
      border: 2px dashed transparent;
      border-color: ${isOver ? '#00000040' : 'transparent'};
      border-radius: 4px;
    `,
    itemContainer: css`
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 360px;
    `,
  }),
);

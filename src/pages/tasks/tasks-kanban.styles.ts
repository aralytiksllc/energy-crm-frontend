import { createStyles } from 'antd-style';

export const useTasksKanbanStyles = createStyles(({ css }) => ({
  pageContainer: css`
    height: 85vh;
  `,
  viewModalFooter: css`
    justify-content: space-between;
    width: 100%;
  `,
  editTag: css`
    cursor: pointer;
  `,
  deleteTag: css`
    cursor: pointer;
  `,
  skeletonContainer: css`
    height: 85vh;
  `,
  skeletonCard: css`
    height: 80px;
    background: #f0f0f0;
    border-radius: 8px;
    margin-bottom: 8px;
  `,
}));

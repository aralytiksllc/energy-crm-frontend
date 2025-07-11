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
  viewModalHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
  `,
  viewModalBody: css`
    background: #fafbfc;
    border-radius: 12px;
    padding: 24px;
  `,
  assigneeCard: css`
    background: #fff;
    border-radius: 10px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    margin-bottom: 4px;
  `,
  assigneeAvatar: css`
    background: #e6f4ff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 18px;
  `,
  assigneeInfo: css`
    font-weight: 600;
    font-size: 15px;
  `,
  assigneeHours: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
}));

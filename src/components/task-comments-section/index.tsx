import React from 'react';
import { TaskComments } from '../task-comments';

export interface TaskCommentsSectionProps {
  taskId?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const TaskCommentsSection: React.FC<TaskCommentsSectionProps> = ({
  taskId,
  disabled = false,
  loading = false,
}) => {
  return (
    <TaskComments
      comments={[]}
      disabled={disabled}
      loading={loading}
      placeholder="Comments will be available when task comment API is implemented..."
    />
  );
};

export default TaskCommentsSection;

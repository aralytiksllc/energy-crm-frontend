import React, { useState, useCallback } from 'react';
import { TaskComments } from '../task-comments';
import type { TaskComment } from '../task-comments/task-comments.types';

export interface TaskCommentsSectionProps {
  taskId?: string;
  currentUser?: {
    id: number;
    name: string;
    avatar?: string;
  };
  disabled?: boolean;
  loading?: boolean;
}

export const TaskCommentsSection: React.FC<TaskCommentsSectionProps> = ({
  taskId,
  currentUser,
  disabled = false,
  loading = false,
}) => {
  // Mock comments data - in a real app, this would come from an API
  const [comments, setComments] = useState<TaskComment[]>([
    {
      id: '1',
      content:
        'This task looks good. I suggest we prioritize it for the next sprint.',
      author: {
        id: 1,
        name: 'John Doe',
        avatar: undefined,
      },
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      taskId: taskId || 'mock-task-id',
    },
    {
      id: '2',
      content:
        'I agree with John. We should also consider adding some additional test cases to ensure quality.',
      author: {
        id: 2,
        name: 'Jane Smith',
        avatar: undefined,
      },
      createdAt: new Date(Date.now() - 43200000), // 12 hours ago
      updatedAt: new Date(Date.now() - 21600000), // 6 hours ago (edited)
      taskId: taskId || 'mock-task-id',
    },
    {
      id: '3',
      content:
        'Great point about the test cases! I can help with that. Let me know when you want to start working on this.',
      author: {
        id: 3,
        name: 'Mike Wilson',
        avatar: undefined,
      },
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      taskId: taskId || 'mock-task-id',
    },
  ]);

  const handleAddComment = useCallback(
    async (content: string) => {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newComment: TaskComment = {
        id: Date.now().toString(),
        content,
        author: currentUser,
        createdAt: new Date(),
        taskId: taskId || 'mock-task-id',
      };

      setComments((prev) => [...prev, newComment]);
    },
    [currentUser, taskId],
  );

  const handleEditComment = useCallback(
    async (commentId: string, content: string) => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content, updatedAt: new Date() }
            : comment,
        ),
      );
    },
    [],
  );

  const handleDeleteComment = useCallback(async (commentId: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }, []);

  // Sort comments by creation date (oldest first)
  const sortedComments = comments.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  return (
    <TaskComments
      comments={sortedComments}
      loading={loading}
      disabled={disabled}
      currentUser={currentUser}
      onAddComment={handleAddComment}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}
      placeholder="Add a comment to this task..."
      maxLength={1000}
      showCount
    />
  );
};

export default TaskCommentsSection;

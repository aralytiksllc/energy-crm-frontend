import { useState, useCallback } from 'react';
import { useCan } from '@refinedev/core';
import { message } from 'antd';

export const useTaskViewModal = (updateAssignee: any, refetch: any) => {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [actualHours, setActualHours] = useState<Record<string, number | null>>(
    {},
  );

  const { data: canEdit } = useCan({
    resource: 'tasks',
    action: 'edit',
    params: { id: selectedTask?.id },
  });

  const { data: canDelete } = useCan({
    resource: 'tasks',
    action: 'delete',
    params: { id: selectedTask?.id },
  });

  const handleCardClick = useCallback((task: any) => {
    setSelectedTask(task);
    if (task && Array.isArray(task.assignees)) {
      const initialActualHours: Record<string, number | null> = {};
      task.assignees.forEach((assignee: any) => {
        initialActualHours[assignee.id] = assignee.actualHours ?? null;
      });
      setActualHours(initialActualHours);
    }
    setIsViewModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsViewModalVisible(false);
    setSelectedTask(null);
  }, []);

  const handleActualHoursChange = useCallback(
    (assigneeId: string, value: number | null) => {
      setActualHours((prev) => ({ ...prev, [assigneeId]: value }));
    },
    [],
  );

  const handleSaveActualHours = useCallback(
    (assigneeId: string) => {
      const hours = actualHours[assigneeId];
      if (hours === null || hours === undefined) {
        message.error('Please enter a valid number for actual hours.');
        return;
      }

      const taskTitle = selectedTask?.title || 'Task';

      updateAssignee(
        {
          resource: `tasks/${selectedTask.id}/assignee`,
          id: assigneeId,
          values: { actualHours: hours },
          successNotification: {
            message: `Actual hours for task "${taskTitle}" updated successfully!`,
            type: 'success',
          },
          errorNotification: {
            message: `Failed to update actual hours for task "${taskTitle}".`,
            type: 'error',
          },
        },
        {
          onSuccess: () => {
            refetch();
          },
        },
      );
    },
    [
      actualHours,
      selectedTask?.id,
      selectedTask?.title,
      updateAssignee,
      refetch,
    ],
  );

  return {
    // State
    isViewModalVisible,
    selectedTask,
    actualHours,

    // Permissions
    canEdit: canEdit?.can,
    canDelete: canDelete?.can,

    // Actions
    handleCardClick,
    handleCloseModal,
    handleActualHoursChange,
    handleSaveActualHours,
  };
};

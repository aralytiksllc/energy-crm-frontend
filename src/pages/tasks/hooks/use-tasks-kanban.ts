import { useMemo, useCallback } from 'react';
import {
  useList,
  useUpdate,
  useDelete,
  useCreate,
  useCan,
  useGetIdentity,
} from '@refinedev/core';
import type { IUser } from '@interfaces/index';
import type { IProject } from '@interfaces/index';

const STATUS_ORDER = ['todo', 'in_progress', 'review', 'done'];

const STATUS_LABELS: Record<string, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

export const useTasksKanban = () => {
  const { mutate: updateTask } = useUpdate();
  const { mutate: deleteTask } = useDelete();
  const { mutate: createTask } = useCreate();
  const { data: identity } = useGetIdentity<IUser>();
  const { mutate: updateAssignee } = useUpdate();

  const { data: users, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const { data: canEditTasks } = useCan({
    resource: 'tasks',
    action: 'edit',
  });

  const { data: canCreateTasks } = useCan({
    resource: 'tasks',
    action: 'create',
  });

  const { data, isLoading, refetch } = useList({
    resource: 'tasks',
    pagination: { mode: 'off', pageSize: 1000 },
  });

  const tasks = data?.data || [];

  const filteredTasks = useMemo(() => {
    if (
      identity?.role?.name === 'superadmin' ||
      identity?.role?.name === 'manager'
    ) {
      return tasks;
    }

    if (identity?.id) {
      return tasks.filter((task: any) => {
        return task.assignees?.some(
          (assignee: any) => assignee.userId === identity.id,
        );
      });
    }

    return tasks;
  }, [tasks, identity]);

  const sections = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      id: status,
      title: STATUS_LABELS[status],
      count:
        filteredTasks?.filter((task: any) => (task.status || 'todo') === status)
          .length || 0,
      tasks:
        filteredTasks?.filter(
          (task: any) => (task.status || 'todo') === status,
        ) || [],
    }));
  }, [filteredTasks]);

  const handleDragEnd = useCallback(
    (event: any) => {
      if (!canEditTasks?.can) {
        return;
      }

      const { active, over } = event;
      if (!active || !over || active.data.current?.status === over.id) return;

      const taskId = active.id;
      const newStatus = over.id;
      const task = tasks.find(
        (t: any) => t.id.toString() === taskId.toString(),
      );
      const taskTitle = task?.title || 'Task';
      const statusLabel = STATUS_LABELS[newStatus] || newStatus;

      updateTask({
        resource: 'tasks',
        id: taskId,
        values: {
          status: newStatus,
        },
        mutationMode: 'optimistic',
        successNotification: {
          message: `Task "${taskTitle}" has been updated successfully to the ${statusLabel} status`,
          type: 'success',
        },
        errorNotification: {
          message: `Error updating task "${taskTitle}" status`,
          type: 'error',
        },
      });
    },
    [updateTask, canEditTasks?.can, tasks],
  );

  const handleDeleteCard = useCallback(
    (taskId: string) => {
      const task = tasks.find(
        (t: any) => t.id.toString() === taskId.toString(),
      );
      const taskTitle = task?.title || 'Task';

      deleteTask({
        resource: 'tasks',
        id: taskId,
        successNotification: {
          message: `Task "${taskTitle}" deleted successfully`,
          type: 'success',
        },
        errorNotification: {
          message: `Error deleting task "${taskTitle}"`,
          type: 'error',
        },
      });
    },
    [deleteTask, tasks],
  );

  const transformTaskValues = (values: any) => {
    const transformedValues = { ...values };
    if (Array.isArray(transformedValues.assignees)) {
      transformedValues.assignees = transformedValues.assignees
        .filter((a: any) => a && a.userId)
        .map((a: any) => ({
          userId: a.userId,
          estimatedHours: a.estimatedHours || 0,
        }));
    } else {
      transformedValues.assignees = [];
    }
    return transformedValues;
  };

  return {
    tasks,
    sections,
    users: users?.data,
    projects: projectsData?.data,
    identity,
    isLoading,
    usersLoading,
    projectsLoading,
    canEditTasks: canEditTasks?.can,
    canCreateTasks: canCreateTasks?.can,
    handleDragEnd,
    handleDeleteCard,
    transformTaskValues,
    updateAssignee,
    refetch,
  };
};

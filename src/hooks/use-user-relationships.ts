import { useMemo } from 'react';
import { useList } from '@refinedev/core';

export interface UserRelationshipInfo {
  hasRelated: boolean;
  message: string;
}

export const useUserRelationships = () => {
  const { data: tasksData } = useList({
    resource: 'tasks',
    pagination: { mode: 'off' },
  });

  const { data: planningsData } = useList({
    resource: 'plannings',
    pagination: { mode: 'off' },
  });

  const userRelationships = useMemo(() => {
    const tasks = tasksData?.data || [];
    const plannings = planningsData?.data || [];
    const map: Record<number, UserRelationshipInfo> = {};

    tasks.forEach((task: any) => {
      (task.assignees || []).forEach((assignee: any) => {
        if (!map[assignee.userId]) {
          map[assignee.userId] = { hasRelated: false, message: '' };
        }
        map[assignee.userId].hasRelated = true;
      });
    });

    plannings.forEach((planning: any) => {
      if (!map[planning.assignedUserId]) {
        map[planning.assignedUserId] = { hasRelated: false, message: '' };
      }
      map[planning.assignedUserId].hasRelated = true;
    });

    Object.keys(map).forEach((userId) => {
      const relatedTasks = tasks.filter((task: any) =>
        (task.assignees || []).some(
          (assignee: any) => assignee.userId === Number(userId),
        ),
      );
      const relatedPlannings = plannings.filter(
        (planning: any) => planning.assignedUserId === Number(userId),
      );

      if (relatedTasks.length > 0 || relatedPlannings.length > 0) {
        const taskNames = relatedTasks
          .slice(0, 3)
          .map((t: any) => t.title)
          .join(', ');
        const planningNames = relatedPlannings
          .slice(0, 3)
          .map((p: any) => p.title)
          .join(', ');

        let message =
          'This user cannot be deleted because they have active assignments:';
        if (relatedTasks.length > 0) {
          message += `\n• Tasks: ${taskNames}`;
          if (relatedTasks.length > 3)
            message += ` (and ${relatedTasks.length - 3} more)`;
        }
        if (relatedPlannings.length > 0) {
          message += `\n• Planning: ${planningNames}`;
          if (relatedPlannings.length > 3)
            message += ` (and ${relatedPlannings.length - 3} more)`;
        }
        message +=
          '\n\nPlease reassign or delete these items first before deleting the user.';

        map[Number(userId)].message = message;
      }
    });

    return map;
  }, [tasksData, planningsData]);

  return userRelationships;
};

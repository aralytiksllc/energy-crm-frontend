import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { Task } from '@interfaces/task';
import type { LatestLead, UpcomingTask } from '../types/dashboard-tables.types';
import { DASHBOARD_TABLES_CONSTANTS } from '../constants/dashboard-tables.constants';

export const useDashboardTables = (tasks: Task[]) => {
  const latestLeads = useMemo(
    (): LatestLead[] => [...DASHBOARD_TABLES_CONSTANTS.MOCK_DATA.LATEST_LEADS],
    [],
  );

  const upcomingTasks = useMemo((): UpcomingTask[] => {
    const today = dayjs();
    const futureDate = dayjs().add(
      DASHBOARD_TABLES_CONSTANTS.TASK_FILTER.DAYS_AHEAD,
      'day',
    );

    return tasks
      .filter((task) => {
        if (!task.dueDate || task.isCompleted) return false;
        const dueDate = dayjs(task.dueDate);
        return dueDate.isBetween(today, futureDate, 'day', '[]');
      })
      .sort((a, b) => dayjs(a.dueDate!).valueOf() - dayjs(b.dueDate!).valueOf())
      .slice(0, DASHBOARD_TABLES_CONSTANTS.TASK_FILTER.MAX_TASKS)
      .map((task) => ({
        key: task.id.toString(),
        name: task.title,
        dueDate: dayjs(task.dueDate!).format('MM/DD/YYYY'),
        priority: task.priority || 'Medium',
        status: 'Pending',
      }));
  }, [tasks]);

  return {
    latestLeads,
    upcomingTasks,
  };
};

import { useMemo } from 'react';
import { createTrendData, type TrendData } from '../../../utils/trend-utils';
import type { IPlanning, IProject, Task } from '@interfaces/index';

interface DashboardTrendsData {
  plannings: TrendData;
  projects: TrendData;
  plannedHours: TrendData;
  workedHours: TrendData;
}

interface UseDashboardTrendsProps {
  currentPlannings: IPlanning[];
  previousPlannings: IPlanning[];
  currentProjects: IProject[];
  previousProjects: IProject[];
  currentTasks: Task[];
  previousTasks: Task[];
}

/**
 * Calculate hours from tasks for a specific hour type
 */
const calculateHours = (
  tasks: Task[],
  hourType: 'estimatedHours' | 'actualHours',
): number => {
  let totalHours = 0;

  for (const task of tasks) {
    if (!task.assignees) continue;

    for (const assignee of task.assignees) {
      totalHours += (assignee as any)[hourType] || 0;
    }
  }

  return totalHours;
};

/**
 * Custom hook to calculate dashboard trends
 */
export const useDashboardTrends = (
  props: UseDashboardTrendsProps,
): DashboardTrendsData => {
  const {
    currentPlannings,
    previousPlannings,
    currentProjects,
    previousProjects,
    currentTasks,
    previousTasks,
  } = props;

  return useMemo(() => {
    // Calculate active plannings
    const currentActivePlannings = currentPlannings.filter(
      (p) => !p.isCompleted,
    ).length;
    const previousActivePlannings = previousPlannings.filter(
      (p) => !p.isCompleted,
    ).length;

    // Calculate project counts
    const currentProjectCount = currentProjects.length;
    const previousProjectCount = previousProjects.length;

    // Calculate planned hours
    const currentPlannedHours = calculateHours(currentTasks, 'estimatedHours');
    const previousPlannedHours = calculateHours(
      previousTasks,
      'estimatedHours',
    );

    // Calculate worked hours
    const currentWorkedHours = calculateHours(currentTasks, 'actualHours');
    const previousWorkedHours = calculateHours(previousTasks, 'actualHours');

    return {
      plannings: createTrendData(
        currentActivePlannings,
        previousActivePlannings,
      ),
      projects: createTrendData(currentProjectCount, previousProjectCount),
      plannedHours: createTrendData(currentPlannedHours, previousPlannedHours),
      workedHours: createTrendData(currentWorkedHours, previousWorkedHours),
    };
  }, [
    currentPlannings,
    previousPlannings,
    currentProjects,
    previousProjects,
    currentTasks,
    previousTasks,
  ]);
};

/**
 * Mock trends for development/demo purposes
 */
export const useMockDashboardTrends = (): DashboardTrendsData => {
  return useMemo(
    () => ({
      plannings: { trend: 'up', change: 15.2 },
      projects: { trend: 'up', change: 8.7 },
      plannedHours: { trend: 'up', change: 12.4 },
      workedHours: { trend: 'down', change: -5.3 },
    }),
    [],
  );
};

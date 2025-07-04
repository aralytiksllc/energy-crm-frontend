import {
  ICustomer,
  IProject,
  IUser,
  Task,
  Assignee,
  IPlanning,
} from '@interfaces/index';
import dayjs, { Dayjs } from 'dayjs';

export const getDateRangeFromFilter = (
  filter: string,
  customDateRange: [Dayjs, Dayjs] | null,
): [Dayjs, Dayjs] | null => {
  const now = dayjs();
  switch (filter) {
    case 'today':
      return [now.startOf('day'), now.endOf('day')];
    case 'week':
      return [now.startOf('week'), now.endOf('week')];
    case 'month':
      return [now.startOf('month'), now.endOf('month')];
    case 'lastMonth':
      return [
        now.subtract(1, 'month').startOf('month'),
        now.subtract(1, 'month').endOf('month'),
      ];
    case 'quarter':
      return [now.subtract(3, 'month'), now];
    case 'year':
      return [now.startOf('year'), now.endOf('year')];
    case 'custom':
      return customDateRange;
    default:
      return [now.startOf('month'), now.endOf('month')];
  }
};

export const filterDataByDateRange = <T extends { createdAt: string }>(
  data: T[],
  dateRange: [Dayjs, Dayjs] | null,
): T[] => {
  if (!dateRange) return data;
  return data.filter((item) => {
    const itemDate = dayjs(item.createdAt);
    return itemDate.isBetween(dateRange[0], dateRange[1], 'day', '[]');
  });
};

const calculateTaskHours = (
  tasks: Task[],
  isManagerMode: boolean,
  userId?: number,
): number => {
  return tasks.reduce((sum, task) => {
    if (isManagerMode) {
      return (
        sum +
        (task.assignees?.reduce(
          (taskSum: number, assignee: Assignee) =>
            taskSum + (assignee.estimatedHours || 0),
          0,
        ) || 0)
      );
    }
    const userAssignment = task.assignees?.find(
      (assignee) => assignee.userId === userId,
    );
    return sum + (userAssignment?.estimatedHours || 0);
  }, 0);
};

export const calculateDashboardStats = (
  userCustomers: ICustomer[],
  userProjects: IProject[],
  userTasks: Task[],
  isManagerMode: boolean,
  userId?: number,
) => {
  const plannedHours = calculateTaskHours(userTasks, isManagerMode, userId);
  return {
    totalClients: userCustomers.length,
    totalProjects: userProjects.length,
    plannedHours,
    workedHours: Math.round(plannedHours * 0.85),
  };
};

export const processClientHours = (
  userProjects: IProject[],
  userCustomers: ICustomer[],
  userTasks: Task[],
  isManagerMode: boolean,
  userId?: number,
) => {
  const customerHours = new Map<string, number>();

  userProjects.forEach((project) => {
    const customer = userCustomers.find((c) => c.id === project.customerId);
    const customerName = customer?.name || 'Unknown Customer';

    const projectTasks = userTasks.filter(
      (task) => task.projectId === project.id,
    );
    const hours = calculateTaskHours(projectTasks, isManagerMode, userId);

    customerHours.set(
      customerName,
      (customerHours.get(customerName) || 0) + hours,
    );
  });

  return Array.from(customerHours.entries())
    .map(([type, value]) => ({ type, value }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};

export const processProjectHours = (
  userProjects: IProject[],
  userTasks: Task[],
  isManagerMode: boolean,
  userId?: number,
) => {
  return userProjects
    .map((project) => {
      const projectTasks = userTasks.filter(
        (task) => task.projectId === project.id,
      );
      const plannedHours = calculateTaskHours(
        projectTasks,
        isManagerMode,
        userId,
      );
      const actualHours = Math.round(plannedHours * 0.85);

      return {
        name: project.name,
        plannedHours,
        actualHours,
        totalHours: plannedHours + actualHours,
      };
    })
    .filter((item) => item.totalHours > 0)
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 5);
};

export const calculateLegacyTicketStats = (userTasks: Task[]) => {
  const ticketStatsMap = new Map<string, number>();

  userTasks.forEach((task) => {
    const key = `${task.type} - ${task.isCompleted ? 'Completed' : 'Open'}`;
    ticketStatsMap.set(key, (ticketStatsMap.get(key) || 0) + 1);
  });

  const result = Array.from(ticketStatsMap.entries()).map(([type, count]) => ({
    type,
    count,
  }));

  if (result.length === 0) {
    return [
      { type: 'Bug - Open', count: 0 },
      { type: 'Feature - Completed', count: 0 },
      { type: 'Task - Open', count: 0 },
      { type: 'Enhancement - Completed', count: 0 },
    ];
  }
  return result;
};

export interface TicketStats {
  total: number;
  bugs: number;
  features: number;
  tasks: number;
  completed: number;
  overdue: number;
}

export interface DeadlineInfo {
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'task' | 'planning';
  projectName?: string;
}

export interface ProductivityMetrics {
  completionRate: number;
  taskCompletionRate: number;
  totalUserTasks: number;
  completedTasks: number;
  overdueTasks: number;
  thisWeekTasks: number;
  mostActiveProject?: {
    name: string;
    hours: number;
  };
}

export const calculateTicketStats = (tasks: Task[]): TicketStats => {
  const stats = {
    total: tasks.length,
    bugs: tasks.filter((task) => task.type?.toLowerCase().includes('bug'))
      .length,
    features: tasks.filter((task) =>
      task.type?.toLowerCase().includes('feature'),
    ).length,
    tasks: tasks.filter((task) => task.type?.toLowerCase().includes('task'))
      .length,
    completed: tasks.filter((item) => item.isCompleted).length,
    overdue: tasks.filter((item) => {
      if (item.isCompleted) return false;
      const dueDate = item.dueDate;
      return dueDate && dayjs(dueDate).isBefore(dayjs(), 'day');
    }).length,
  };

  return stats;
};

export const getUpcomingDeadlines = (
  tasks: Task[],
  projects: IProject[] = [],
  daysAhead = 7,
): DeadlineInfo[] => {
  const deadlines: DeadlineInfo[] = [];
  const cutoffDate = dayjs().add(daysAhead, 'day');

  tasks
    .filter((task) => !task.isCompleted && task.dueDate)
    .forEach((task) => {
      const dueDate = dayjs(task.dueDate);
      if (dueDate.isBefore(cutoffDate)) {
        const project = projects.find((p) => p.id === task.projectId);
        deadlines.push({
          title: task.title,
          dueDate: task.dueDate!,
          priority:
            (task.priority?.toLowerCase() as 'high' | 'medium' | 'low') ||
            'medium',
          type: 'task',
          projectName: project?.name,
        });
      }
    });

  return deadlines
    .sort((a, b) => dayjs(a.dueDate).diff(dayjs(b.dueDate)))
    .slice(0, 5);
};

export const calculateProductivityMetrics = (
  tasks: Task[],
  projects: IProject[],
  userId: number,
): ProductivityMetrics => {
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const totalUserTasks = tasks.length;
  const taskCompletionRate =
    totalUserTasks > 0
      ? Math.round((completedTasks / totalUserTasks) * 100)
      : 0;

  const overdueTasks = tasks.filter((task) => {
    if (task.isCompleted) return false;
    return task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day');
  }).length;

  const thisWeekStart = dayjs().startOf('week');
  const thisWeekTasks = tasks.filter(
    (task) => task.createdAt && dayjs(task.createdAt).isAfter(thisWeekStart),
  ).length;

  const projectActivity = projects
    .map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.projectId === project.id,
      );
      const projectHours = projectTasks.reduce((sum, task) => {
        const userAssignment = task.assignees?.find(
          (assignee: Assignee) => assignee.userId === userId,
        );
        return sum + (userAssignment?.estimatedHours || 0);
      }, 0);
      return { name: project.name, hours: projectHours };
    })
    .sort((a, b) => b.hours - a.hours);

  const mostActiveProject = projectActivity[0] || undefined;

  const totalPlannedHours = tasks.reduce((sum, task) => {
    const userAssignment = task.assignees?.find(
      (assignee: Assignee) => assignee.userId === userId,
    );
    return sum + (userAssignment?.estimatedHours || 0);
  }, 0);

  const estimatedWorkedHours = Math.round(totalPlannedHours * 0.85);
  const completionRate =
    totalPlannedHours > 0
      ? Math.round((estimatedWorkedHours / totalPlannedHours) * 100)
      : 0;

  return {
    completionRate,
    taskCompletionRate,
    totalUserTasks,
    completedTasks,
    overdueTasks,
    thisWeekTasks,
    mostActiveProject,
  };
};

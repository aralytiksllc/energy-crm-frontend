import { ICustomer, IProject, Task, Assignee } from '@interfaces/index';
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

const calculateHours = (
  tasks: Task[],
  hourType: 'estimatedHours' | 'actualHours',
): number => {
  let totalHours = 0;

  for (const task of tasks) {
    if (!task.assignees) continue;

    for (const assignee of task.assignees) {
      totalHours += assignee[hourType] || 0;
    }
  }

  return totalHours;
};

export const calculateDashboardStats = (
  userCustomers: ICustomer[],
  userProjects: IProject[],
  userTasks: Task[],
) => {
  const plannedHours = calculateHours(userTasks, 'estimatedHours');
  const workedHours = calculateHours(userTasks, 'actualHours');

  return {
    totalClients: userCustomers.length,
    totalProjects: userProjects.length,
    plannedHours,
    workedHours,
  };
};

export const processClientHours = (
  userProjects: IProject[],
  userCustomers: ICustomer[],
  userTasks: Task[],
) => {
  const customerHours = new Map<string, number>();

  userProjects.forEach((project) => {
    const customer = userCustomers.find((c) => c.id === project.customerId);
    const customerName = customer?.name || 'Unknown Customer';

    const projectTasks = userTasks.filter(
      (task) => task.projectId === project.id,
    );
    const hours = calculateHours(projectTasks, 'estimatedHours');

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
) => {
  return userProjects
    .map((project) => {
      const projectTasks = userTasks.filter(
        (task) => task.projectId === project.id,
      );
      const plannedHours = calculateHours(projectTasks, 'estimatedHours');
      const actualHours = calculateHours(projectTasks, 'actualHours');

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
    const isCompleted =
      task.isCompleted || task.status?.toLowerCase() === 'done';
    const key = `${task.type} - ${isCompleted ? 'Completed' : 'Open'}`;
    ticketStatsMap.set(key, (ticketStatsMap.get(key) || 0) + 1);
  });

  const result = Array.from(ticketStatsMap.entries()).map(([type, count]) => ({
    type,
    count,
  }));

  if (result.length === 0) {
    return [
      { type: 'FEATURE - Open', count: 0 },
      { type: 'BUG - Open', count: 0 },
      { type: 'CODE_REVIEW - Open', count: 0 },
      { type: 'TESTING - Open', count: 0 },
    ];
  }

  return result;
};

export interface TicketStats {
  total: number;
  completed: number;
  overdue: number;
  FEATURE: number;
  BUG: number;
  CODE_REVIEW: number;
  TESTING: number;
  DOCUMENTATION: number;
  REFACTOR: number;
  MEETING: number;
  DEPLOYMENT: number;
  RESEARCH: number;
  OTHER: number;
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

export const calculateTicketStats = (
  tasks: Task[],
  userId?: number,
): TicketStats => {
  const tasksForCounting = tasks;

  const stats = {
    total: tasksForCounting.length,
    completed: tasksForCounting.filter(
      (item) => item.status?.toLowerCase() === 'done' || item.isCompleted,
    ).length,
    overdue: tasks.filter((item) => {
      // Exclude completed tasks
      const isTaskCompleted =
        item.status?.toLowerCase() === 'done' || item.isCompleted;
      if (isTaskCompleted) return false;

      // Must have a due date
      if (!item.dueDate) return false;

      // Check if task is overdue
      const isOverdue = dayjs(item.dueDate).isBefore(dayjs(), 'day');
      if (!isOverdue) return false;

      return true;
    }).length,
    FEATURE: tasksForCounting.filter((task) => task.type === 'FEATURE').length,
    BUG: tasksForCounting.filter((task) => task.type === 'BUG').length,
    CODE_REVIEW: tasksForCounting.filter((task) => task.type === 'CODE_REVIEW')
      .length,
    TESTING: tasksForCounting.filter((task) => task.type === 'TESTING').length,
    DOCUMENTATION: tasksForCounting.filter(
      (task) => task.type === 'DOCUMENTATION',
    ).length,
    REFACTOR: tasksForCounting.filter((task) => task.type === 'REFACTOR')
      .length,
    MEETING: tasksForCounting.filter((task) => task.type === 'MEETING').length,
    DEPLOYMENT: tasksForCounting.filter((task) => task.type === 'DEPLOYMENT')
      .length,
    RESEARCH: tasksForCounting.filter((task) => task.type === 'RESEARCH')
      .length,
    OTHER: tasksForCounting.filter((task) => task.type === 'OTHER').length,
  };

  return stats;
};

export const getUpcomingDeadlines = (
  tasks: Task[],
  projects: IProject[] = [],
  userId?: number,
  daysAhead = 7,
): DeadlineInfo[] => {
  const deadlines: DeadlineInfo[] = [];
  const cutoffDate = dayjs().add(daysAhead, 'day');

  tasks
    .filter((task) => {
      // Exclude completed tasks
      const isTaskCompleted =
        task.isCompleted || task.status?.toLowerCase() === 'done';
      if (isTaskCompleted) return false;

      // Must have a due date
      if (!task.dueDate) return false;

      // If userId is provided, only show tasks assigned to this user
      if (userId) {
        const isAssignedToUser = task.assignees?.some(
          (assignee) => assignee.userId === userId,
        );
        if (!isAssignedToUser) return false;
      }

      return true;
    })
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
  // Filter tasks assigned to the user
  const userTasks = tasks.filter((task) =>
    task.assignees?.some((assignee: Assignee) => assignee.userId === userId),
  );

  const completedTasks = userTasks.filter(
    (task) => task.status?.toLowerCase() === 'done' || task.isCompleted,
  ).length;

  const totalUserTasks = userTasks.length;
  const taskCompletionRate =
    totalUserTasks > 0
      ? Math.round((completedTasks / totalUserTasks) * 100)
      : 0;

  const overdueTasks = userTasks.filter((task) => {
    // Exclude completed tasks
    const isTaskCompleted =
      task.status?.toLowerCase() === 'done' || task.isCompleted;
    if (isTaskCompleted) return false;

    // Must have due date and be overdue
    return task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day');
  }).length;

  const thisWeekStart = dayjs().startOf('week');
  const thisWeekTasks = userTasks.filter(
    (task) => task.createdAt && dayjs(task.createdAt).isAfter(thisWeekStart),
  ).length;

  const projectActivity = projects
    .map((project) => {
      const projectTasks = userTasks.filter(
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

  const totalPlannedHours = userTasks.reduce((sum, task) => {
    const userAssignment = task.assignees?.find(
      (assignee: Assignee) => assignee.userId === userId,
    );
    return sum + (userAssignment?.estimatedHours || 0);
  }, 0);

  const totalActualHours = userTasks.reduce((sum, task) => {
    const userAssignment = task.assignees?.find(
      (assignee: Assignee) => assignee.userId === userId,
    );
    return sum + (userAssignment?.actualHours || 0);
  }, 0);

  const completionRate =
    totalPlannedHours > 0
      ? Math.round((totalActualHours / totalPlannedHours) * 100)
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

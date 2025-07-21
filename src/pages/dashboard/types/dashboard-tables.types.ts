import type { Task } from '@interfaces/task';

export interface DashboardTablesProps {
  tasks: Task[];
}

export interface LatestLead {
  key: string;
  initials: string;
  name: string;
  source: string;
  status: string;
  createdAt: string;
}

export interface UpcomingTask {
  key: string;
  name: string;
  dueDate: string;
  priority: string;
  status: string;
}

export interface TaskCardProps {
  task: UpcomingTask;
  isLast: boolean;
}

export interface LatestLeadsCardProps {
  leads: LatestLead[];
}

export interface UpcomingTasksCardProps {
  tasks: UpcomingTask[];
}

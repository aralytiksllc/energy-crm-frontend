export enum TaskType {
  EMAIL = 'EMAIL',
  MEETING = 'MEETING',
  PHONE_CALL = 'PHONE_CALL',
  OTHER = 'OTHER',
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  type: TaskType;
  dueDate: Date;
  isCompleted: boolean;
  project: Project;
  assignedTo: User[];
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stage {
  id: string;
  name: string;
  ticketCount: number;
  tasks?: Task[];
  loading?: boolean;
  projectId: number;
}

import { ProjectStatus } from './project-status.enum';
import { ProjectPriority } from './project-priority.enum';
import { ICustomer } from './customer';
import { IProjectMember } from './project-member';

export interface IProject {
  id: number;
  createdById?: number;
  updatedById?: number;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  description?: string;
  category?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  customerId?: number;
  customer?: ICustomer;
  projectManagerId?: number;
  budget: number;
  startDate: Date;
  deadline?: Date;
  endDate?: Date;
  isArchived: boolean;
  isPrivate: boolean;
  technologies?: string[];
  tags?: string[];
  color?: string;
  notes?: string;
  members: IProjectMember[];
  tasks: any[];
}

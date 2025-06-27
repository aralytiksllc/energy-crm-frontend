import { ProjectRole } from './project-role.enum';
import { IUser } from './users';

export interface IProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
}

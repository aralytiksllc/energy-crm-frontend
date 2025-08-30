// External
import { IRole } from './roles';

export interface IUser {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  team: string;

  dateOfBirth?: Date;

  dateOfJoining?: Date;

  isActive?: boolean;

  password?: string;

  roleId?: number;

  role: IRole;
}

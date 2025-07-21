import { BaseRecord } from '@refinedev/core';
import { IRole } from './role';

export interface IUser extends BaseRecord {
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  roleId?: number;
  team: string;
  dateOfBirth?: Date;
  dateOfJoining?: Date;
  isActive?: boolean;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

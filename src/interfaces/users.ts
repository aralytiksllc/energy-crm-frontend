import { BaseRecord } from '@refinedev/core';
import { IRole } from './role';

export interface IUser extends BaseRecord {
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  team: string;
}

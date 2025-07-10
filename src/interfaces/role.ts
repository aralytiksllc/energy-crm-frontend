import { BaseRecord } from '@refinedev/core';

export interface IPermission extends BaseRecord {
  name: string;
  description: string;
}

export interface IRolePermission {
  id: number;
  roleId: number;
  permissionId: number;
  permission: IPermission;
}

export interface IRole extends BaseRecord {
  name: string;
  rolePermissions?: IRolePermission[];
}

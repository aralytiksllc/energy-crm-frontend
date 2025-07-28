import { BaseRecord } from '@refinedev/core';

export interface IRolePermission extends BaseRecord {
  name: string;
  description: string;
}

export interface IRolePermissionMapping {
  id: number;
  roleId: number;
  permissionId: number;
  permission: IRolePermission;
}

export interface IRole extends BaseRecord {
  name: string;
  rolePermissions?: IRolePermissionMapping[];
}

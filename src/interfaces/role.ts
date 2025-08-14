export interface IRole {
  id: number;
  name: string;
  rolePermissions?: IRolePermissionMapping[];
}

export interface IRolePermissionMapping {
  id: number;
  roleId: number;
  permissionId: number;
  permission: IPermission;
}

export interface IPermission {
  id: number;
  name: string;
}

export interface ResourcePermissions {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canList: boolean;
  hasAnyPermission: boolean;
  hasActionsPermission: boolean;
}

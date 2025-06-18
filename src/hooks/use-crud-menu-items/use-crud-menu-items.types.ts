// External imports
import type { MenuProps } from 'antd';

// Internal imports

export type UseCrudMenuItems = Required<MenuProps>['items'];

export interface useCrudMenuItemsProps {
  resource: string;
  resourceId: number;
  meta?: Record<string, unknown>;

  showLabel?: string;
  editLabel?: string;
  deleteLabel?: string;

  confirmTitle?: string;
  confirmMessage?: string;
}

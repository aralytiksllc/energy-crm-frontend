// External imports
import type { MenuProps } from 'antd';

// Internal imports

export type UseDeleteMenuItem = Required<MenuProps>['items'][number];

export interface UseDeleteMenuItemProps {
  resource: string;
  resourceId: number;
  confirmTitle?: string;
  confirmMessage?: string;
  label?: string;
}

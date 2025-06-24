// External imports
import type { MenuProps } from 'antd';

// Internal imports

export type UseEditMenuItem = Required<MenuProps>['items'][number];

export interface UseEditMenuItemProps {
  resource: string;
  resourceId: number;
  label?: string;
}

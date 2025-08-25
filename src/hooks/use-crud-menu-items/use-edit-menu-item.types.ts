// External
import type { MenuProps } from 'antd';

// Internal

export type UseEditMenuItem = Required<MenuProps>['items'][number];

export interface UseEditMenuItemProps {
  resource: string;
  resourceId: number;
  label?: string;
}

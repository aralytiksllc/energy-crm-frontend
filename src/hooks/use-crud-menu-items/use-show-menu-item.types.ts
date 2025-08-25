// External
import type { MenuProps } from 'antd';

// Internal

export type UseShowMenuItem = Required<MenuProps>['items'][number];

export interface UseShowMenuItemProps {
  resource: string;
  resourceId: number;
  label?: string;
}

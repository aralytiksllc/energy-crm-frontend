// External imports
import type { MenuProps } from 'antd';
import type { ReactElement } from 'react';

// Internal imports

export type UseDeleteMenuItem = Required<MenuProps>['items'][number] & {
  modal?: ReactElement;
};

export interface UseDeleteMenuItemProps {
  resource: string;
  resourceId: number;
  confirmTitle?: string;
  confirmMessage?: string;
  label?: string;
}

// External
import type { MenuProps } from 'antd';
import type { ReactElement } from 'react';

// Internal

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

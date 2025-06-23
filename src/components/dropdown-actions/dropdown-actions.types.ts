// External imports
import type { DropdownProps, MenuProps } from 'antd';

// Internal imports

export interface DropdownActionsProps {
  items: MenuProps['items'];
  placement?: DropdownProps['placement'];
  onItemClick?: (key: string) => void;
}

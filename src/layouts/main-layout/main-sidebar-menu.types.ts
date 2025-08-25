// External
import type { MenuProps } from 'antd';

// Internal

export type SidebarMenuSectionProps = {
  title?: string;

  items: MenuProps['items'];

  collapsed: boolean;

  selectedKeys?: string[];

  onSelect?: (key: string) => void;
};

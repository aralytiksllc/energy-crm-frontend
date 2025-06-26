import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

export interface DrawerTabItem {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface DrawerTabsProps {
  items: DrawerTabItem[];
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  tabProps?: Omit<TabsProps, 'items' | 'activeKey' | 'onChange'>;
}

export const DrawerTabs: React.FC<DrawerTabsProps> = ({
  items,
  activeKey,
  onChange,
  tabProps = {},
}) => {
  const tabItems = items.map(({ key, label, children, disabled }) => ({
    key,
    label,
    children,
    disabled,
  }));

  return (
    <Tabs
      items={tabItems}
      activeKey={activeKey}
      onChange={onChange}
      type="card"
      size="middle"
      {...tabProps}
    />
  );
};

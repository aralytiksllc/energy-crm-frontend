import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useGenericTabsStyles } from './generic-tabs.styles';

export interface GenericTabItem {
  key: string;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  closable?: boolean;
}

export interface GenericTabsProps {
  items: GenericTabItem[];
  activeKey?: string;
  onChange?: (activeKey: string) => void;
  type?: TabsProps['type'];
  size?: TabsProps['size'];
  tabPosition?: TabsProps['tabPosition'];
  animated?: boolean;
  hideAdd?: boolean;
  onEdit?: (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => void;
  className?: string;
  style?: React.CSSProperties;
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];
  tabProps?: Omit<TabsProps, 'items' | 'activeKey' | 'onChange'>;
}

export const GenericTabs: React.FC<GenericTabsProps> = ({
  items,
  activeKey,
  onChange,
  type = 'card',
  size = 'middle',
  tabPosition = 'top',
  animated = true,
  hideAdd = true,
  onEdit,
  className,
  style,
  tabBarExtraContent,
  tabProps = {},
}) => {
  const { styles, cx } = useGenericTabsStyles();

  const tabItems = items.map(
    ({ key, label, children, disabled, icon, closable }) => ({
      key,
      label,
      children,
      disabled,
      icon,
      closable,
    }),
  );

  const getStyleClass = () => {
    let styleClass = styles.container;

    if (type === 'card') {
      styleClass = cx(styleClass, styles.cardStyle);
    } else if (type === 'line') {
      styleClass = cx(styleClass, styles.lineStyle);
    }

    if (size === 'small') {
      styleClass = cx(styleClass, styles.compactSize);
    } else if (size === 'large') {
      styleClass = cx(styleClass, styles.largeSize);
    }

    return className ? cx(styleClass, className) : styleClass;
  };

  return (
    <Tabs
      items={tabItems}
      activeKey={activeKey}
      onChange={onChange}
      type={type}
      size={size}
      tabPosition={tabPosition}
      animated={animated}
      hideAdd={hideAdd}
      onEdit={onEdit}
      className={getStyleClass()}
      style={style}
      tabBarExtraContent={tabBarExtraContent}
      {...tabProps}
    />
  );
};

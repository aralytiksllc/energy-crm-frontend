// External
import * as React from 'react';
import { Menu, Typography } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

// Internal
import type { SidebarMenuSectionProps } from './main-sidebar-menu.types';
import { useStyles } from './main-sidebar-menu.styles';

const { Text } = Typography;

export const SidebarMenuSection: React.FC<SidebarMenuSectionProps> = (
  props,
) => {
  const { collapsed, title, items, selectedKeys, onSelect } = props;

  const { styles } = useStyles();

  const handledClick = React.useCallback(
    (info: MenuInfo) => {
      onSelect?.(String(info.key));
    },
    [onSelect],
  );

  return (
    <React.Fragment>
      {!collapsed && title && (
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionTitle} type="secondary">
            {title}
          </Text>
        </div>
      )}
      <Menu
        onClick={handledClick}
        selectedKeys={selectedKeys}
        inlineCollapsed={collapsed}
        className={styles.menu}
        items={items}
        mode="inline"
      />
    </React.Fragment>
  );
};

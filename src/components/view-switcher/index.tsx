import { useState } from 'react';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useViewMode } from '@contexts/ViewModeContext';
import { useViewSwitcherStyles } from './view-switcher.styles';

export const ViewSwitcher = ({ collapsed }: { collapsed: boolean }) => {
  const { styles } = useViewSwitcherStyles();
  const { viewMode, setViewMode } = useViewMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    setViewMode(key as 'manager' | 'user');
    setIsDropdownOpen(false);
  };

  const menuItems: MenuProps['items'] = [
    { key: 'manager', label: 'Manager' },
    { key: 'user', label: 'User' },
  ];

  return (
    <div className={styles.container}>
      <Dropdown
        menu={{ items: menuItems, onClick: handleMenuClick }}
        trigger={['click']}
        onOpenChange={setIsDropdownOpen}
        open={isDropdownOpen}
      >
        <Button className={styles.button}>
          {collapsed ? (
            isDropdownOpen ? (
              <UpOutlined />
            ) : (
              <DownOutlined />
            )
          ) : (
            <Space>
              {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
              {isDropdownOpen ? <UpOutlined /> : <DownOutlined />}
            </Space>
          )}
        </Button>
      </Dropdown>
    </div>
  );
};

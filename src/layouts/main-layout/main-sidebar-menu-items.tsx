// src/AppMenuSimple.tsx
import React from 'react';
import { Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router';
import {
  TeamOutlined,
  BarChartOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  UserOutlined,
  SafetyOutlined,
  KeyOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useMenu } from '@refinedev/core';

const { Text } = Typography;

type Props = { collapsed?: boolean };

export const MainSidebarMenuItems: React.FC<Props> = ({
  collapsed = false,
}) => {
  const { selectedKey, defaultOpenKeys } = useMenu();

  const items: MenuProps['items'] = [
    {
      type: 'group',
      key: 'main-menu',
      label: collapsed ? null : (
        <Text type="secondary" style={{ fontSize: 12 }}>
          Main Menu
        </Text>
      ),
      children: [
        {
          key: '/',
          icon: <DashboardOutlined />,
          label: <Link to="/">Dashboard</Link>,
        },
        {
          key: '/customers',
          icon: <TeamOutlined />,
          label: <Link to="/customers">Customers</Link>,
        },
        {
          key: '/consumptions',
          icon: <BarChartOutlined />,
          label: <Link to="/consumptions">Consumptions</Link>,
        },
        {
          key: '/contracts',
          icon: <FileDoneOutlined />,
          label: <Link to="/contracts">Contracts</Link>,
        },
        {
          key: '/forecasting',
          icon: <LineChartOutlined />,
          label: <Link to="/forecasting">Forecasting</Link>,
        },
      ],
    },
    {
      type: 'group',
      key: 'grp-admin',
      label: collapsed ? null : (
        <Text type="secondary" style={{ fontSize: 12 }}>
          Admin
        </Text>
      ),
      children: [
        {
          key: '/users',
          icon: <UserOutlined />,
          label: <Link to="/users">Users</Link>,
        },
        {
          key: '/roles',
          icon: <SafetyOutlined />,
          label: <Link to="/roles">Roles</Link>,
        },
        {
          key: '/permissions',
          icon: <KeyOutlined />,
          label: <Link to="/permissions">Permissions</Link>,
        },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}
      selectedKeys={[selectedKey]}
      defaultOpenKeys={defaultOpenKeys}
      items={items}
      style={{ borderInlineEnd: 0, paddingTop: 8 }}
    />
  );
};

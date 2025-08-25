// ==============================================
// File: src/layout/sidebar/Sidebar.tsx
// ==============================================
import React from 'react';
import { Layout, Typography, Divider, theme, MenuProps } from 'antd';
import { SidebarMenuSection } from './main-sidebar-menu';
import { MainSidebarUser } from './main-sidebar-user';
import {
  AppstoreOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FundOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { MainSidebarMenuItems } from './main-sidebar-menu-items';

export const primaryItems: MenuProps['items'] = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'lifecycle', icon: <AppstoreOutlined />, label: 'Lifecycle' },
  { key: 'analytics', icon: <FundOutlined />, label: 'Analytics' },
  { key: 'projects', icon: <ProjectOutlined />, label: 'Projects' },
  { key: 'team', icon: <TeamOutlined />, label: 'Team' },
];

export const documentItems: MenuProps['items'] = [
  { key: 'data-library', icon: <DatabaseOutlined />, label: 'Data Library' },
  { key: 'reports', icon: <FileDoneOutlined />, label: 'Reports' },
  {
    key: 'word-assistant',
    icon: <FileTextOutlined />,
    label: 'Word Assistant',
  },
];

export const footerItems: MenuProps['items'] = [
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
  { key: 'help', icon: <QuestionCircleOutlined />, label: 'Get Help' },
  { key: 'search', icon: <SearchOutlined />, label: 'Search' },
];

const { Sider } = Layout;
const { Text } = Typography;

export type SidebarProps = {
  collapsed: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { token } = theme.useToken();

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      width={280}
      trigger={null}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          borderRight: `2px solid ${token.colorSplit}`,
        }}
      >
        {/* Scrollable area */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: 12,
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingInline: 8,
              height: 48,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                border: `2px solid ${token.colorText}`,
              }}
            />
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text strong ellipsis style={{ fontSize: 18 }}>
                  MDA Energy
                </Text>
              </div>
            )}
          </div>

          <MainSidebarMenuItems collapsed={collapsed} />
        </div>

        {/* Fixed footer card */}
        <div
          style={{ padding: 12, borderTop: `1px solid ${token.colorSplit}` }}
        >
          <MainSidebarUser collapsed={collapsed} />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;

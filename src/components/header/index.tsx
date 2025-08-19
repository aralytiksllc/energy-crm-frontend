// External imports
import React from 'react';
import { Layout, Space, Avatar, Typography, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useGetIdentity } from '@refinedev/core';
import { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useHeaderStyles } from './header.styles';

const { Text } = Typography;

interface HeaderProps extends RefineThemedLayoutV2HeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed = false, onCollapse }) => {
  const { styles } = useHeaderStyles();
  const { data: user } = useGetIdentity<{
    id: number;
    name: string;
    email: string;
    avatar: string;
  }>();

  const handleCollapse = () => {
    onCollapse?.(!collapsed);
  };

  return (
    <Layout.Header className={styles.header}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleCollapse}
      />

      <Space size="middle">
        {user?.name && <Text strong>{user.name}</Text>}
        {user?.avatar ? (
          <Avatar src={user.avatar} alt={user.name} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </Space>
    </Layout.Header>
  );
};

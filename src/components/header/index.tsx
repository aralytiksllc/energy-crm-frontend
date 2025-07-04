// External imports
import React from 'react';
import { Layout, Space, Switch, Avatar, Typography, Segmented } from 'antd';
import { useGetIdentity } from '@refinedev/core';
import { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useHeaderStyles } from './header.styles';
import { useViewMode } from '@contexts/ViewModeContext';

const { Text } = Typography;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { styles } = useHeaderStyles();
  const { data: user } = useGetIdentity<{
    id: number;
    name: string;
    email: string;
    avatar: string;
  }>();
  const { viewMode, setViewMode } = useViewMode();

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>Core Flow</h1>
      </div>

      <Space className={styles.leftSection} size="middle">
        <Segmented
          options={['Manager', 'User']}
          value={viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          onChange={(value) =>
            setViewMode(value.toString().toLowerCase() as 'manager' | 'user')
          }
        />
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          defaultChecked={false}
        />
        {user?.name && <Text strong>{user.name}</Text>}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </Layout.Header>
  );
};

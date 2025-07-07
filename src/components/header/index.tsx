// External imports
import React from 'react';
import { Layout, Space, Switch, Avatar, Typography } from 'antd';
import { useGetIdentity } from '@refinedev/core';
import { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useHeaderStyles } from './header.styles';

const { Text } = Typography;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { styles } = useHeaderStyles();
  const { data: user } = useGetIdentity<{
    id: number;
    name: string;
    email: string;
    avatar: string;
  }>();

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.logoContainer}>
        <h1 className={styles.title}>Core Flow</h1>
      </div>

      <Space className={styles.leftSection} size="middle">
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

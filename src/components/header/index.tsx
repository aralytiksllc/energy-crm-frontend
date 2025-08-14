// External imports
import React from 'react';
import { Layout, Space,  Avatar, Typography } from 'antd';
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

      <Space className={styles.leftSection} size="middle">
        {user?.name && <Text strong>{user.name}</Text>}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </Layout.Header>
  );
};

// External
import * as React from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLogout } from '@refinedev/core';

// Internal
import AppSidebar from './main-sidebar';
import { useStyles } from './main-layout.styles';

const { Header, Content } = Layout;

export type MainLayoutProps = React.PropsWithChildren<{}>;

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { children } = props;

  const { styles } = useStyles();

  const [collapsed, setCollapsed] = React.useState(false);

  const { mutate, isLoading } = useLogout();

  const icon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

  const handleToggle = React.useCallback(
    () => setCollapsed((collapsed) => !collapsed),
    [setCollapsed],
  );

  return (
    <Layout className={styles.root} hasSider={true}>
      <AppSidebar collapsed={collapsed} />

      <Layout className={styles.right}>
        <Header className={styles.header}>
          <Button
            onClick={handleToggle}
            size="large"
            icon={icon}
            type="text"
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <Button size="large" disabled={isLoading} onClick={() => mutate()}>
            Logout
          </Button>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

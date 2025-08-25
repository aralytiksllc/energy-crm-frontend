// External
import * as React from 'react';
import { Layout, Tabs } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useMenu } from '@refinedev/core';

// Internal
import { useStyles } from './pane-layout.styles';
import { PaneLayoutProps } from './pane-layout.types';

const { Sider, Content } = Layout;

export const PaneLayout: React.FC<PaneLayoutProps> = (props) => {
  const { sider, children } = props;

  const { styles } = useStyles();

  return (
    <Layout className={styles.root}>
      <Sider className={styles.sider} theme="light" width={400}>
        {sider}
      </Sider>
      <Content className={styles.content}>
        <AppNav />
        <div style={{ padding: '32px' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export const AppNav = () => {
  const params = useParams();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const customerId = params.customerId ?? params.id;

  const items = [
    {
      key: `/customers/${customerId}`,
      label: 'Company Info',
      disabled: !customerId,
    },
    {
      key: `/customers/${customerId}/branches`,
      label: 'Branches',
      disabled: !customerId,
    },
  ];

  return (
    <Tabs
      activeKey={pathname}
      defaultActiveKey={pathname}
      items={items}
      onChange={(key) => navigate(key)}
      tabBarStyle={{
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
      }}
      centered={false}
      type="line"
    />
  );
};

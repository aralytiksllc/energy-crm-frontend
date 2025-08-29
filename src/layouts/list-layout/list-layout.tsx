// External
import * as React from 'react';
import { Layout } from 'antd';

// Internal
import { useStyles } from './list-layout.styles';
import { ListLayoutProps } from './list-layout.types';

const { Content } = Layout;

export const ListLayout: React.FC<ListLayoutProps> = (props) => {
  const { children } = props;

  const { styles } = useStyles();

  return (
    <Layout className={styles.root}>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};

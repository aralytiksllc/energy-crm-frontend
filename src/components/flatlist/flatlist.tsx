// External
import * as React from 'react';
import { Virtuoso, type VirtuosoProps } from 'react-virtuoso';
import { Empty, Spin } from 'antd';
import { useStyles } from './flatlist.styles';
import { FlatListProps } from './flatlist.types';

export function FlatList<T, C = any>(props: FlatListProps<T, C>) {
  const { loading, emptyText, ...restProps } = props;

  const { styles } = useStyles();

  const components: NonNullable<VirtuosoProps<T, C>['components']> = {
    EmptyPlaceholder: loading
      ? () => (
          <div className={styles.emptyWrap}>
            <Spin />
          </div>
        )
      : () => (
          <div className={styles.emptyWrap}>
            <Empty description={emptyText} />
          </div>
        ),

    Footer: loading
      ? () => (
          <div className={styles.footer}>
            <Spin />
          </div>
        )
      : undefined,
  };

  return (
    <Virtuoso<T, C>
      className={styles.root}
      components={components}
      {...restProps}
    />
  );
}

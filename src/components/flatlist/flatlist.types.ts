// External
import * as React from 'react';
import type { VirtuosoProps } from 'react-virtuoso';

// Internal

export type FlatListProps<T, C = any> = Omit<
  VirtuosoProps<T, C>,
  'components'
> & {
  loading?: boolean;
  emptyText?: React.ReactNode;
};

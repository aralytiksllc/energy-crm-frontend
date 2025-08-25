// External
import * as React from 'react';
import { List as AntdList } from '@refinedev/antd';

// Internal
import type { ListProps } from './list.types';

export const List: React.FC<ListProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <AntdList {...restProps} >
      {children}
    </AntdList>
  );
};

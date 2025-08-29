// External
import * as React from 'react';
import { Edit as AntdEdit } from '@refinedev/antd';

// Internal
import type { EditProps } from './edit.types';

export const Edit: React.FC<EditProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <AntdEdit {...restProps} goBack={false}>
      {children}
    </AntdEdit>
  );
};

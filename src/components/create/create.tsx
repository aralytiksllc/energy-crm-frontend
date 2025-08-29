// External
import * as React from 'react';
import { Create as AntdCreate } from '@refinedev/antd';

// Internal
import type { CreateProps } from './create.types';

export const Create: React.FC<CreateProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <AntdCreate {...restProps} goBack={false}   >
      {children}
    </AntdCreate>
  );
};

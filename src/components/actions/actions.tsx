import * as React from 'react';
import { Space } from 'antd';
import { EditButton, ShowButton, DeleteButton } from '@refinedev/antd';
import { ActionsProps } from './types';

export const Actions: React.FC<ActionsProps> = (props) => {
  const { record, config } = props;
  return (
    <Space>
      {config?.showButton !== null && (
        <ShowButton
          hideText={config?.showButton?.hideText ?? true}
          size={config?.showButton?.size ?? 'small'}
          recordItemId={record.id}
          {...config?.showButton}
        />
      )}
      {config?.editButton !== null && (
        <EditButton
          hideText={config?.editButton?.hideText ?? true}
          size={config?.editButton?.size ?? 'small'}
          recordItemId={record.id}
          {...config?.editButton}
        />
      )}
      {config?.deleteButton !== null && (
        <DeleteButton
          hideText={config?.deleteButton?.hideText ?? true}
          size={config?.deleteButton?.size ?? 'small'}
          recordItemId={record.id}
          {...config?.deleteButton}
        />
      )}
    </Space>
  );
};

import * as React from 'react';
import { Descriptions } from 'antd';
import { Show, TextField, DateField, BooleanField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { IVendor } from '../types';

export const VendorShow: React.FC = () => {
  const { query } = useShow<IVendor>();

  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="ID" span={2}>
          <TextField value={record?.id} />
        </Descriptions.Item>

        <Descriptions.Item label="Name" span={2}>
          <TextField value={record?.name} />
        </Descriptions.Item>

        <Descriptions.Item label="Description" span={2}>
          <TextField value={record?.description} />
        </Descriptions.Item>

        <Descriptions.Item label="Contact Email">
          <TextField value={record?.contactEmail} />
        </Descriptions.Item>

        <Descriptions.Item label="Contact Phone">
          <TextField value={record?.contactPhone} />
        </Descriptions.Item>

        <Descriptions.Item label="Website" span={2}>
          <TextField value={record?.website} />
        </Descriptions.Item>

        <Descriptions.Item label="Status">
          <BooleanField value={record?.isActive} />
        </Descriptions.Item>

        <Descriptions.Item label="Created At">
          <DateField value={record?.createdAt} />
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          <DateField value={record?.updatedAt} />
        </Descriptions.Item>

        {record?.createdBy && (
          <Descriptions.Item label="Created By">
            <TextField
              value={`${record.createdBy.firstName} ${record.createdBy.lastName}`}
            />
          </Descriptions.Item>
        )}

        {record?.updatedBy && (
          <Descriptions.Item label="Updated By">
            <TextField
              value={`${record.updatedBy.firstName} ${record.updatedBy.lastName}`}
            />
          </Descriptions.Item>
        )}

        {record?.settings && (
          <Descriptions.Item label="Settings" span={2}>
            <TextField value={JSON.stringify(record.settings, null, 2)} />
          </Descriptions.Item>
        )}
      </Descriptions>
    </Show>
  );
};

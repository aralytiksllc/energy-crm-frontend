import * as React from 'react';
import { Descriptions } from 'antd';
import { Show, TextField, DateField, BooleanField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { IUser } from './types';

export const UsersShow: React.FC = () => {
  const { query } = useShow<IUser>();

  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="ID" span={2}>
          <TextField value={record?.id} />
        </Descriptions.Item>

        <Descriptions.Item label="First Name">
          <TextField value={record?.firstName} />
        </Descriptions.Item>

        <Descriptions.Item label="Last Name">
          <TextField value={record?.lastName} />
        </Descriptions.Item>

        <Descriptions.Item label="Email" span={2}>
          <TextField value={record?.email} />
        </Descriptions.Item>

        <Descriptions.Item label="Date of Birth">
          <DateField value={record?.dateOfBirth} />
        </Descriptions.Item>

        <Descriptions.Item label="Date of Joining">
          <DateField value={record?.dateOfJoining} />
        </Descriptions.Item>

        <Descriptions.Item label="Active">
          <BooleanField value={record?.isActive} />
        </Descriptions.Item>

        {record?.settings && (
          <Descriptions.Item label="Settings" span={2}>
            <TextField value={JSON.stringify(record.settings, null, 2)} />
          </Descriptions.Item>
        )}
      </Descriptions>
    </Show>
  );
};

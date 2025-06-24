// External dependencies
import React from 'react';
import { Select, SelectProps, Space } from 'antd';
import { useList } from '@refinedev/core';
import type { IUser } from '@/interfaces/users';
import { UserAvatar } from '../user-avatar';

export const UserSelect: React.FC<SelectProps> = (props) => {
  const { data, isLoading } = useList<IUser>({ resource: 'users' });

  const users = data?.data || [];

  const options = users.map((user) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return {
      value: user.id,
      label: (
        <Space>
          <UserAvatar user={user} size="small" />
          {fullName}
        </Space>
      ),
      searchText: fullName,
    };
  });

  return (
    <Select
      loading={isLoading}
      options={options}
      filterOption={(input, option) =>
        (option?.searchText ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};

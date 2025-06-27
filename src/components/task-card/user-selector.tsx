import React from 'react';
import { Select, Space } from 'antd';
import { IUser } from '@interfaces/users';
import { UserAvatar } from '@components/user-avatar';

export interface UserSelectorProps {
  value?: number[];
  onChange?: (userIds: number[]) => void;
  users: IUser[];
  disabled?: boolean;
  placeholder?: string;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  value = [],
  onChange,
  users,
  disabled = false,
  placeholder = 'Select users',
}) => {
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

  const labelRender = (option: any) => {
    const selectedUser = users.find((user) => user.id === option.value);
    if (selectedUser) {
      const fullName =
        `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim();
      return (
        <Space>
          <UserAvatar user={selectedUser} size="small" />
          {fullName}
        </Space>
      );
    }
    return option.label;
  };

  return (
    <Select
      mode="multiple"
      value={value}
      onChange={onChange}
      options={options}
      labelRender={labelRender}
      disabled={disabled}
      placeholder={placeholder}
      style={{ width: '100%' }}
      filterOption={(input, option) =>
        (option?.searchText ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

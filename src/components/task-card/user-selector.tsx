import React from 'react';
import { Select, Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { UserSelectorProps } from './task-card.types';
import { useTaskCardStyles } from './task-card.styles';

const { Text } = Typography;

export const UserSelector: React.FC<UserSelectorProps> = ({
  value = [],
  onChange,
  users = [],
  placeholder = 'Select users',
  disabled = false,
  mode = 'multiple',
  allowClear = true,
  showSearch = true,
  className,
  style,
}) => {
  const { styles } = useTaskCardStyles();

  const options = users.map((user) => ({
    label: (
      <Space>
        <Avatar
          size="small"
          src={user.avatar}
          icon={!user.avatar && <UserOutlined />}
        />
        <Text>{user.name}</Text>
      </Space>
    ),
    value: user.id,
    searchValue: user.name.toLowerCase(),
  }));

  const handleChange = (selectedValues: number | number[]) => {
    if (mode === 'single') {
      onChange?.([selectedValues as number]);
    } else {
      onChange?.(selectedValues as number[]);
    }
  };

  const filterOption = (input: string, option: any) => {
    return option.searchValue.includes(input.toLowerCase());
  };

  const tagRender = (props: any) => {
    const { value: userId, closable, onClose } = props;
    const user = users.find((u) => u.id === userId);

    if (!user) return <></>;

    return (
      <span className={styles.userTag}>
        <Avatar
          size={16}
          src={user.avatar}
          icon={!user.avatar && <UserOutlined />}
        />
        <Text className={styles.userTagText}>{user.name}</Text>
        {closable && (
          <span onClick={onClose} className={styles.userTagClose}>
            ×
          </span>
        )}
      </span>
    );
  };

  return (
    <Select
      mode={mode === 'single' ? undefined : 'multiple'}
      value={mode === 'single' ? value[0] : value}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      allowClear={allowClear}
      showSearch={showSearch}
      filterOption={filterOption}
      tagRender={mode === 'multiple' ? tagRender : undefined}
      className={className}
      style={style}
      popupMatchSelectWidth={false}
      optionLabelProp="label"
    />
  );
};

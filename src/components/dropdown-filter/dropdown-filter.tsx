import React from 'react';
import { Select, Space } from 'antd';

interface DropdownFilterProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  defaultValue?: string;
  width?: number;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  onChange,
  defaultValue = 'all',
  width = 155,
}) => {
  return (
    <Space>
      <Select
        style={{ width }}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
      />
    </Space>
  );
};

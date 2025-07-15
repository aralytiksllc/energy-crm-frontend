import React from 'react';
import { Select, Space } from 'antd';
import { useDropdownFilterStyles } from './dropdown-filter.styles';

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
  const { styles } = useDropdownFilterStyles({ width });
  return (
    <Space>
      <Select
        className={styles.select}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
      />
    </Space>
  );
};

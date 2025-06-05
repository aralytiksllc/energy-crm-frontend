import { Select } from 'antd';
import { FilterDropdown } from '@refinedev/antd';
import { BaseRecord, useSelect } from '@refinedev/core';
import { FilterSelectProps } from './types';

export const FilterSelect = <T extends BaseRecord>(
  props: FilterSelectProps<T>,
) => {
  const { useSelectProps, dropdownProps } = props;

  const selectProps = useSelect<T>(useSelectProps);

  return (
    <FilterDropdown {...dropdownProps}>
      <Select
        placeholder="Search..."
        style={{ width: 300 }}
        filterOption={false}
        showSearch={true}
        {...selectProps}
      />
    </FilterDropdown>
  );
};

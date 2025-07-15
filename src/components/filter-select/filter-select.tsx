import { Select } from 'antd';
import { FilterDropdown } from '@refinedev/antd';
import { BaseRecord, useSelect } from '@refinedev/core';
import { FilterSelectProps } from './types';
import { useFilterSelectStyles } from './filter-select.styles';

export const FilterSelect = <T extends BaseRecord>(
  props: FilterSelectProps<T>,
) => {
  const { useSelectProps, dropdownProps } = props;
  const { styles } = useFilterSelectStyles();

  const selectProps = useSelect<T>(useSelectProps);

  return (
    <FilterDropdown {...dropdownProps}>
      <Select
        placeholder="Search..."
        className={styles.select}
        filterOption={false}
        showSearch={true}
        {...selectProps}
      />
    </FilterDropdown>
  );
};

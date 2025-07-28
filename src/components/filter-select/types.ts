import { FilterDropdownProps } from 'antd/es/table/interface';
import { BaseRecord, HttpError, UseSelectProps } from '@refinedev/core';
import { SelectProps } from 'antd';

export type FilterSelectProps<T extends BaseRecord> = {
  useSelectProps: UseSelectProps<T, HttpError, T>;
  dropdownProps: FilterDropdownProps;
  selectProps?: SelectProps;
};

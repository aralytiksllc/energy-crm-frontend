import { FilterDropdownProps } from 'antd/es/table/interface';
import { BaseRecord, HttpError, UseSelectProps } from '@refinedev/core';

export type FilterSelectProps<T extends BaseRecord> = {
  useSelectProps: UseSelectProps<T, HttpError, T>;
  selectProps: SelectProps<T>;
};

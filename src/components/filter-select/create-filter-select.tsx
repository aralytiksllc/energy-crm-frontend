import * as React from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { BaseRecord, HttpError, UseSelectProps } from '@refinedev/core';
import { FilterSelect } from './filter-select';

export const createFilterSelect = <T extends BaseRecord>(
  useSelectProps: UseSelectProps<T, HttpError, T>,
) => {
  return (props: FilterDropdownProps): React.ReactNode => (
    <FilterSelect useSelectProps={useSelectProps} dropdownProps={props} />
  );
};

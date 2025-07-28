// External dependencies
import type { SelectProps } from 'antd';
import type { BaseRecord } from '@refinedev/core';
import type { ReactNode } from 'react';

export interface UserSelectProps<T extends BaseRecord>
  extends Omit<SelectProps, 'options'> {
  entities: T[];
  optionValue: (item: T) => string | number;
  optionLabel: (item: T) => string;
  renderOption?: (item: T) => ReactNode;
  renderLabel?: (item: T) => ReactNode;
  searchText?: (item: T) => string;
  loading?: boolean;
}

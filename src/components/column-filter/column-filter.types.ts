import { CrudFilters } from '@refinedev/core';
import { ColumnType } from 'antd/es/table';

export type FilterType = 'text' | 'number' | 'date';

export type FilterColumn<T extends object> = ColumnType<T> & {
  filterType?: FilterType;
};

export interface ColumnFilterProps<T extends object = object> {
  column: FilterColumn<T>;
  setFilters: (filters: CrudFilters, behavior: 'replace' | 'merge') => void;
}

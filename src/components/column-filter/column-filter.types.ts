import { CrudFilters } from '@refinedev/core';
import { ColumnType } from 'antd/es/table';

export interface ColumnFilterProps<T extends object = object> {
  columns: ColumnType<T>[];
  setFilters: (filters: CrudFilters, behavior: 'replace' | 'merge') => void;
  defaultField?: string;
}

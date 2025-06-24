// External imports
import type {
  CrudFilters,
  CrudSort,
  GetListParams,
  LogicalFilter,
} from '@refinedev/core';

export interface QueryParams extends GetListParams {
  filters?: CrudFilters;
  sorters?: CrudSort[];
  pagination?: {
    current?: number;
    pageSize?: number;
  };
}

// Transform Refine filters to backend format
const transformFilters = (filters: CrudFilters) => {
  return filters
    .filter((filter): filter is LogicalFilter => 'field' in filter)
    .map((filter) => ({
      field: filter.field,
      operator: filter.operator,
      value: filter.value,
    }));
};

// Transform Refine sorters to backend format
const transformSorters = (sorters: CrudSort[]) => {
  return sorters.map((sorter) => ({
    field: sorter.field,
    order: sorter.order?.toUpperCase() || 'ASC',
  }));
};

export const dataHelper = {
  buildQueryString(params: GetListParams): string {
    const queryParams = new URLSearchParams();

    // Handle pagination
    if (params.pagination) {
      queryParams.append('current', String(params.pagination.current || 1));
      queryParams.append('pageSize', String(params.pagination.pageSize || 20));
    }

    // Handle sorting
    if (params.sorters && params.sorters.length > 0) {
      const transformedSorters = transformSorters(params.sorters);
      queryParams.append('sorters', JSON.stringify(transformedSorters));
    }

    // Handle filtering
    if (params.filters && params.filters.length > 0) {
      const transformedFilters = transformFilters(params.filters);
      queryParams.append('filters', JSON.stringify(transformedFilters));
    }

    return queryParams.toString();
  },
};

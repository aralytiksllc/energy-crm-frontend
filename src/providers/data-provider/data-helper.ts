// External imports
import type {
  CrudFilters,
  CrudSort,
  GetListParams,
  LogicalFilter,
} from '@refinedev/core';
import qs from 'qs';

export interface QueryParams extends GetListParams {
  filters?: CrudFilters;
  sorters?: CrudSort[];
  pagination?: {
    current?: number;
    pageSize?: number;
  };
}

const transformFilters = (filters?: CrudFilters) => {
  if (!filters) return;

  const transformed: { [key: string]: any } = {};
  let i = 0;
  for (const filter of filters) {
    if ('field' in filter) {
      const { field, operator, value } = filter as LogicalFilter;
      transformed[`filters[${i}][field]`] = field;
      transformed[`filters[${i}][operator]`] = operator;
      if (value !== undefined && value !== null) {
        transformed[`filters[${i}][value]`] = value;
      }
      i++;
    }
  }
  return transformed;
};

const transformSorters = (sorters?: CrudSort[]) => {
  if (!sorters) return;

  const transformed: { [key: string]: any } = {};
  sorters.forEach((sorter, i) => {
    transformed[`sorters[${i}][field]`] = sorter.field;
    transformed[`sorters[${i}][order]`] = sorter.order.toUpperCase();
  });
  return transformed;
};

export const dataHelper = {
  buildQueryString(params: GetListParams): string {
    const query: { [key: string]: any } = {};

    if (params.pagination) {
      query.current = params.pagination.current;
      query.pageSize = params.pagination.pageSize;
    }

    if (params.sorters?.length) {
      Object.assign(query, transformSorters(params.sorters));
    }

    if (params.filters?.length) {
      Object.assign(query, transformFilters(params.filters));
    }

    return qs.stringify(query, {
      arrayFormat: 'indices',
      encode: false,
    });
  },
};

// External imports
import type { CrudFilters, CrudSort } from '@refinedev/core';
import qs from 'qs';

export interface QueryParams {
  filters?: CrudFilters;
  sorters?: CrudSort[];
  pagination?: {
    current?: number;
    pageSize?: number;
  };
}

export const dataHelper = {
  buildQueryString(params: QueryParams): string {
    const query: Record<string, any> = {};

    if (params.filters) {
      query.filters = params.filters;
    }

    if (params.sorters) {
      query.sorters = params.sorters;
    }

    if (params.pagination) {
      query.current = params.pagination.current ?? 1;
      query.pageSize = params.pagination.pageSize ?? 20;
    }

    return qs.stringify(query, { encode: false });
  },
};

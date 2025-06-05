import { CrudFilters, CrudSort } from '@refinedev/core';
import qs from 'qs';

export const dataProviderHelper = {
  buildQueryString(params: {
    filters?: CrudFilters;
    sorters?: CrudSort[];
    pagination?: { current?: number; pageSize?: number };
  }): string {
    const queryObject = {
      filters: params.filters,
      sorters: params.sorters,
      current: params.pagination?.current ?? 1,
      pageSize: params.pagination?.pageSize ?? 20,
    };

    return qs.stringify(queryObject, { encode: false });
  },
};

// External
import * as React from 'react';
import type { CrudFilter, LogicalFilter } from '@refinedev/core';

// Internal

export function useFilters(
  searchTerm: string = '',
  selectedTags: string[] = [],
) {
  return React.useMemo(() => {
    const filters: CrudFilter[] = [];

    const q = searchTerm.trim();

    if (q.length > 0) {
      filters.push({
        field: 'companyName',
        operator: 'icontains' as unknown as LogicalFilter['operator'],
        value: q,
      });
    }

    if (selectedTags.length > 0) {
      filters.push({
        field: 'clientStatus',
        operator: 'in',
        value: selectedTags,
      });
    }

    return filters;
  }, [searchTerm, selectedTags]);
}

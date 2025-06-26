import { CrudFilters } from '@refinedev/core';

export interface LiveSearchProps {
  resource: string;
  searchField?: string;
  placeholder?: string;
  onSearch?: (filters: CrudFilters) => void;
  debounce?: number;
}

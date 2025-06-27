import React, { FC } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSelect } from '@refinedev/core';
import { LiveSearchProps } from './live-search.types';
import { createStyles } from './live-search.styles';

export const LiveSearch: FC<LiveSearchProps> = ({
  resource,
  searchField = 'title',
  placeholder = 'Search...',
  onSearch,
  debounce = 300, // Use Refine's built-in debounce
}) => {
  const { styles } = createStyles();

  // Use Refine's built-in debouncing through useSelect
  const { onSearch: onSearchDebounced } = useSelect({
    resource,
    debounce, // Built-in debouncing!
    onSearch: (value) => {
      if (onSearch) {
        // Convert to the expected filter format
        const filters = value
          ? [
              {
                field: searchField,
                operator: 'contains' as const,
                value,
              },
            ]
          : [];
        onSearch(filters);
      }
      // Return empty array since we're handling the filtering externally
      return [];
    },
  });

  return (
    <div className={styles.container}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => onSearchDebounced(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

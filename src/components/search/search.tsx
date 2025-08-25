// External
import * as React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

// Internal
import type { SearchProps } from './search.types';

export const Search: React.FC<SearchProps> = (props) => {
  const { onSearch, delaySearch, delayTimeout, ...restProps } = props;

  const debouncedOnSearch = React.useMemo(
    () => (delaySearch ? debounce(onSearch, delayTimeout) : onSearch),
    [onSearch, delaySearch, delayTimeout],
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      debouncedOnSearch(e.target.value),
    [debouncedOnSearch],
  );

  return (
    <Input.Search
      placeholder="Search..."
      prefix={<SearchOutlined />}
      onChange={handleChange}
      {...restProps}
    />
  );
};

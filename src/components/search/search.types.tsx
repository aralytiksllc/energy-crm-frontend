// External
import type { SearchProps as AntdSearchProps } from 'antd/es/input/Search';

// Internal

export interface SearchProps
  extends Omit<AntdSearchProps, 'onSearch' | 'onChange'> {
  onSearch: (value: string) => void;
  delaySearch?: boolean;
  delayTimeout?: number;
}

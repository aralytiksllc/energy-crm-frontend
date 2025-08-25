// External
import type { Key } from 'react';

// Internal

export interface Options<T> {
  defaultSelected?: T[];

  itemKey?: (item: T) => Key;
}

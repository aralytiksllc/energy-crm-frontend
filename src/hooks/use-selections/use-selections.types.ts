// External dependencies
import type { Key } from 'react';

// Internal dependencies

export interface Options<T> {
  defaultSelected?: T[];

  itemKey?: (item: T) => Key;
}

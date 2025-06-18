import * as React from 'react';

export interface KanbanListProps<T> {
  items: T[];

  renderItem: (item: T, index: number) => React.ReactNode;

  keyExtractor: (item: T) => string | number;

  header?: React.ReactNode;

  footer?: React.ReactNode;
}

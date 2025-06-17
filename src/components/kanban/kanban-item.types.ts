import * as React from 'react';

export interface KanbanItemProps<T> {
  children?: React.ReactNode;

  data: T;

  id: string | number;
}

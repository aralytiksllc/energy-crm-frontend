import type { DragEndEvent } from '@dnd-kit/core';

export interface KanbanColumnProps<T> {
  index: number;

  data: T;

  loading?: boolean;
}

export interface KanbanBoardProps<T> {
  columns: T[];

  keyExtractor: (item: T) => string;

  onDragEnd: (event: DragEndEvent) => void;

  ColumnComponent: React.FC<KanbanColumnProps<T>>;

  loadingColumns?: boolean[];
}

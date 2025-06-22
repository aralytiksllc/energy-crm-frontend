export type KanbanSection<T> = {
  id: string | number;
  name: string;
  items: T[];
};

export type KanbanBoardProps<T> = {
  sections: KanbanSection<T>[];
  keyExtractor: (item: T) => string | number;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderColumnHeader: (section: KanbanSection<T>) => React.ReactNode;
};

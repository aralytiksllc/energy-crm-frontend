import * as React from 'react';
import type { KanbanListProps } from './kanban-list.types';
import { KanbanItem } from './kanban-item';
import { useStyles } from './kanban-list.styles';

export function KanbanList<T>(props: KanbanListProps<T>) {
  const { items, renderItem, keyExtractor } = props;

  const { styles } = useStyles();

  const _renderItem = React.useCallback(
    (item: T, index: number) => (
      <KanbanItem key={keyExtractor(item)} id={keyExtractor(item)} data={item}>
        {renderItem(item, index)}
      </KanbanItem>
    ),
    [renderItem, keyExtractor],
  );

  return items.map(_renderItem);
}

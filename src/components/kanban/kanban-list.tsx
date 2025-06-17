import * as React from 'react';
import type { KanbanListProps } from './kanban-list.types';
import { KanbanItem } from './kanban-item';
import { useStyles } from './kanban-list.styles';

export function KanbanList<T>(props: KanbanListProps<T>) {
  const { items, renderItem, header, footer, keyExtractor } = props;

  const { styles } = useStyles();

  const _renderItem = React.useCallback(
    (item: T, index: number) => (
      <KanbanItem key={keyExtractor(item)} id={keyExtractor(item)} data={item}>
        {renderItem(item, index)}
      </KanbanItem>
    ),
    [renderItem, keyExtractor],
  );

  return (
    <div className={styles.column}>
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>
        <div className={styles.items}>{items.map(_renderItem)}</div>
      </div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
}

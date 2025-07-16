import * as React from 'react';
import { Button, Drawer, Space } from 'antd';
import { useDrawerForm, DeleteButton, List } from '@refinedev/antd';
import { useDelete, useShow as useShowCore, HttpError } from '@refinedev/core';
import { KanbanBoard } from '@components/kanban/kanban-board';
import type { KanbanSection } from '@components/kanban/kanban-board.types';
import { useCrudKanbanStyles } from './crud-kanban.styles';

export interface CrudKanbanProps<TData extends { id: number; status: string }> {
  resource: string;
  sections: KanbanSection<TData>[];
  keyExtractor: (item: TData) => string | number;
  renderItem: (item: TData) => React.ReactNode;
  renderColumnHeader: (section: KanbanSection<TData>) => React.ReactNode;
  FormComponent: React.ComponentType<{ formProps: any }>;
  DetailsComponent: React.ComponentType<{ record: TData }>;
  drawerWidth?: number;
  drawerTitles?: {
    create?: string;
    edit?: string;
    view?: string;
  };
}

export function CrudKanban<TData extends { id: number; status: string }>({
  resource,
  sections,
  keyExtractor,
  renderItem,
  renderColumnHeader,
  FormComponent,
  DetailsComponent,
  drawerWidth = 720,
  drawerTitles = {},
}: CrudKanbanProps<TData>) {
  const { mutate: deleteItem } = useDelete();
  const { styles } = useCrudKanbanStyles();

  const createForm = useDrawerForm<TData, HttpError, TData>({
    action: 'create',
    resource,
  });
  const editForm = useDrawerForm<TData, HttpError, TData>({
    action: 'edit',
    resource,
  });

  const { query: showQueryResult, showId, setShowId } = useShowCore<TData>();
  const { data: showData } = showQueryResult;
  const item = showData?.data;

  const handleDelete = (id: number) => {
    deleteItem({ resource, id, mutationMode: 'pessimistic' });
  };

  const renderItemWithActions = (item: TData) => (
    <div>
      {renderItem(item)}
      <Space className={styles.actions}>
        <Button size="small" onClick={() => editForm.show(item.id)}>
          Edit
        </Button>
        <Button size="small" onClick={() => setShowId(item.id)}>
          View
        </Button>
        <Button size="small" danger onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </Space>
    </div>
  );

  return (
    <>
      <List createButtonProps={{ onClick: () => createForm.show() }}>
        <KanbanBoard<TData>
          sections={sections}
          keyExtractor={keyExtractor}
          renderItem={renderItemWithActions}
          renderColumnHeader={renderColumnHeader}
        />
      </List>

      {/* CREATE */}
      <Drawer
        {...createForm.drawerProps}
        width={drawerWidth}
        title={drawerTitles.create || 'Create'}
        footer={<Button {...createForm.saveButtonProps}>Save</Button>}
      >
        <FormComponent formProps={createForm.formProps} />
      </Drawer>

      {/* EDIT */}
      <Drawer
        {...editForm.drawerProps}
        width={drawerWidth}
        title={drawerTitles.edit || 'Edit'}
        footer={<Button {...editForm.saveButtonProps}>Save</Button>}
      >
        <FormComponent formProps={editForm.formProps} />
      </Drawer>

      {/* VIEW */}
      <Drawer
        open={!!showId}
        onClose={() => setShowId(undefined)}
        title={drawerTitles.view || 'Details'}
        width={drawerWidth}
        extra={
          showId && item ? (
            <DeleteButton
              recordItemId={showId}
              onSuccess={() => setShowId(undefined)}
            />
          ) : null
        }
      >
        <DetailsComponent record={item as TData} />
      </Drawer>
    </>
  );
}

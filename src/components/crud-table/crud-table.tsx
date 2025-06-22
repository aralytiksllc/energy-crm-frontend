import * as React from 'react';
import { Table, Button, Drawer, Space, Typography, TableProps } from 'antd';
import {
  List,
  useTable,
  useDrawerForm,
  Show,
  DeleteButton,
} from '@refinedev/antd';
import { useDelete, useShow, HttpError } from '@refinedev/core';
import { GenericShow } from './GenericShow';

const { Title, Text } = Typography;

export interface CrudTableProps<TData extends { id: number }> {
  resource: string;
  columns: TableProps<TData>['columns'];
  FormComponent: React.ComponentType<{ formProps: any }>;
  DetailsComponent: React.ComponentType<{ record: TData }>;
  drawerWidth?: number;
  drawerTitles?: {
    create?: string;
    edit?: string;
    view?: string;
  };
}

export function CrudTable<TData extends { id: number }>({
  resource,
  columns,
  FormComponent,
  DetailsComponent,
  drawerWidth = 720,
  drawerTitles = {},
}: CrudTableProps<TData>) {
  const { tableProps } = useTable<TData>({
    resource,
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  const { mutate: deleteItem } = useDelete();

  const createForm = useDrawerForm<TData, HttpError, TData>({
    action: 'create',
    resource,
  });
  const editForm = useDrawerForm<TData, HttpError, TData>({
    action: 'edit',
    resource,
  });

  const { query: showQueryResult, showId, setShowId } = useShow<TData>();
  const { data: showData, isLoading: showLoading } = showQueryResult;
  const item = showData?.data;

  const handleDelete = (id: number) => {
    deleteItem({ resource, id, mutationMode: 'pessimistic' });
  };

  const actionColumn: any = {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: TData) => (
      <Space>
        <Button type="link" onClick={() => editForm.show(record.id)}>
          Edit
        </Button>
        <Button type="link" onClick={() => setShowId(record.id)}>
          View
        </Button>
        <Button danger type="link" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      </Space>
    ),
  };

  return (
    <>
      <List createButtonProps={{ onClick: () => createForm.show() }}>
        <Table<TData>
          {...tableProps}
          rowKey="id"
          columns={[...(columns || []), actionColumn]}
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
          <DeleteButton
            recordItemId={showId}
            onSuccess={() => setShowId(undefined)}
          />
        }
      >
        <GenericShow columns={columns as any} record={item as any} />
      </Drawer>
    </>
  );
}

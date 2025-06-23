import * as React from 'react';
import { Button, Space, Typography, TableProps } from 'antd';
import { List, useTable, useDrawerForm } from '@refinedev/antd';
import { useDelete, useShow, HttpError } from '@refinedev/core';
import type { FormProps } from 'antd';

import { DrawerForm } from './DrawerForm';
import { DynamicTable } from './DynamicTable';
import { keyExtractor } from './keyExtractor';

import { EditButton } from '@/components/edit-button';

const { Text } = Typography;

export interface CrudTableProps<TData extends { id: number }> {
  resource: string;
  columns: any;
  renderForm: (formProps: FormProps) => React.ReactNode;
  drawerWidth?: number;
  drawerTitles?: {
    create?: string;
    edit?: string;
    view?: string;
  };
}

export function CrudTable<TData extends { id: number }>(
  props: CrudTableProps<TData>,
) {
  const {
    resource,
    columns,
    renderForm,
    drawerWidth = 720,
    drawerTitles = {},
  } = props;

  const { tableProps } = useTable<TData>({
    filters: { mode: 'server' },
    syncWithLocation: true,
    resource,
  });

  const { mutate: deleteItem } = useDelete();

  const createDrawerForm = useDrawerForm({
    action: 'create',
    resource,
  });

  const editDrawerForm = useDrawerForm({
    action: 'edit',
    resource,
  });

  const handleCreate = React.useCallback(
    () => createDrawerForm.show(),
    [createDrawerForm.show],
  );

  const handleEdit = React.useCallback(
    (id: number) => editDrawerForm.show(id),
    [editDrawerForm.show],
  );

  const handleDelete = React.useCallback(
    (id: number) => deleteItem({ resource, id, mutationMode: 'pessimistic' }),
    [deleteItem, resource],
  );

  //
  //
  //
  //
  //
  //

  //

  const createButtonProps = React.useMemo(
    () => ({ onClick: handleCreate }),
    [handleCreate],
  );

  const actionColumn = React.useMemo(
    () => ({
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: TData) => (
        <Space>
          <EditButton
            resource={resource}
            resourceId={record.id}
            onClick={handleEdit}
            type="default"
            size="small"
          />
          <EditButton
            resource={resource}
            resourceId={record.id}
            onClick={handleEdit}
            type="default"
            size="small"
          />
        </Space>
      ),
    }),
    [handleEdit],
  );

  const headerButtons = React.useCallback(
    ({ defaultButtons }: any) => <Space>{defaultButtons}</Space>,
    [],
  );

  const fullColumns = React.useMemo(
    () => [...columns, actionColumn],
    [columns, actionColumn],
  );

  return (
    <List headerButtons={headerButtons} createButtonProps={createButtonProps}>
      <DynamicTable<TData>
        columns={fullColumns}
        tableProps={tableProps}
        initialVisibleKeys={fullColumns.map(keyExtractor)}
      />
      <DrawerForm
        {...createDrawerForm}
        renderForm={renderForm}
        title={drawerTitles.create}
        width={drawerWidth}
      />
      <DrawerForm
        {...editDrawerForm}
        renderForm={renderForm}
        title={drawerTitles.edit}
        width={drawerWidth}
      />
    </List>
  );
}

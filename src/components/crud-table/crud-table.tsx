import * as React from 'react';
import { Table, Typography, TableProps, Space } from 'antd';
import { List, useTable, useDrawerForm } from '@refinedev/antd';
import { useDelete, useShow, HttpError } from '@refinedev/core';
import type { FormProps } from 'antd';

import { DrawerForm } from '../drawer-form/drawer-form';

import { EditButton } from '@/components/edit-button';
import { DeleteButton } from '@/components/delete-button';

import { PopoverSelect } from '@/components/dropdown-select';
import { useSelections } from '@/hooks/use-selections';
import { DrawerFormProvider } from '@/components/drawer-form';

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

  const createButtonProps = React.useMemo(
    () => ({ onClick: handleCreate }),
    [handleCreate],
  );

  const [selectedColumns, setSelectedColumns] = React.useState(columns);

  const onSelectColumn = (column: any) => {
    setSelectedColumns((prev: any[]) => {
      const map = new Map(prev.map((c) => [c.dataIndex, c]));
      map.has(column.dataIndex)
        ? map.delete(column.id)
        : map.set(column.id, column);
      return Array.from(map.values());
    });
  };

  const onToggleAll = () => {
    setSelectedColumns((prev: any[]) =>
      prev.length === columns.length ? [] : [...columns],
    );
  };

  return (
    <DrawerFormProvider drawerForm={editDrawerForm}>
      <List
        createButtonProps={createButtonProps}
        headerButtons={({ defaultButtons }) => (
          <Space>
            <PopoverSelect
              options={columns}
              selected={selectedColumns}
              onSelect={onSelectColumn}
              onToggleAll={onToggleAll}
              optionKey={(col: any) => col.dataIndex}
              optionLabel={(col: any) => col.title}
              buttonLabel="Selecte Columns"
            />
            {defaultButtons}
          </Space>
        )}
      >
        <Table {...tableProps} columns={selectedColumns} />
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
    </DrawerFormProvider>
  );
}

import * as React from 'react';
import { Table, Space } from 'antd';
import { List, useTable, useDrawerForm } from '@refinedev/antd';
import type { FormProps } from 'antd';

import { DrawerForm } from '../drawer-form/drawer-form';

import { PopoverSelect } from '@/components/dropdown-select';
import { DrawerFormProvider } from '@/components/drawer-form';

export interface CrudTableProps<TData extends { id: number }> {
  resource: string;
  columns: any;
  renderForm: (formProps: FormProps) => React.ReactNode;
  drawerWidth?: number;
  createInitialValues?: Partial<TData>;
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
    createInitialValues,
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

  const augmentedCreateDrawerForm = {
    ...createDrawerForm,
    formProps: {
      ...createDrawerForm.formProps,
      initialValues: createInitialValues,
    },
  };

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
              buttonLabel="Select Columns"
            />
            {defaultButtons}
          </Space>
        )}
      >
        <Table
          {...tableProps}
          rowKey="id"
          columns={selectedColumns}
          scroll={{ x: true }}
        />
        <DrawerForm
          {...augmentedCreateDrawerForm}
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

import * as React from 'react';
import { Table, Space } from 'antd';
import { List, useTable, useDrawerForm } from '@refinedev/antd';
import type { FormProps } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { DrawerForm } from '@components/drawer-form/drawer-form';

import { PopoverSelect } from '@components/dropdown-select';
import { DrawerFormProvider } from '@components/drawer-form';
import { ColumnFilter } from '@components/column-filter';

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

  const { tableProps, setFilters } = useTable<TData>({
    filters: { mode: 'server' },
    sorters: { mode: 'server' },
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

  const filterableColumns = React.useMemo(
    () => columns.filter((c: any) => c.key !== 'actions' && c.dataIndex),
    [columns],
  );

  const augmentedColumns = React.useMemo(
    () =>
      columns.map((column: any) => {
        if (column.key === 'actions') {
          return {
            ...column,
            filterDropdown: undefined,
          };
        }

        return {
          ...column,
          filterIcon: () => <FilterOutlined />,
          filterDropdown: () => (
            <ColumnFilter
              columns={filterableColumns}
              setFilters={setFilters}
              defaultField={column.dataIndex || column.key}
            />
          ),
        };
      }),
    [columns, setFilters, filterableColumns],
  );

  const [selectedColumns, setSelectedColumns] =
    React.useState(augmentedColumns);

  React.useEffect(() => {
    setSelectedColumns(augmentedColumns);
  }, [augmentedColumns]);

  const onSelectColumn = (column: any) => {
    setSelectedColumns((prev: any[]) => {
      const map = new Map(prev.map((c) => [c.dataIndex, c]));
      map.has(column.dataIndex)
        ? map.delete(column.dataIndex)
        : map.set(column.dataIndex, column);
      return Array.from(map.values());
    });
  };

  const onToggleAll = () => {
    setSelectedColumns((prev: any[]) =>
      prev.length === columns.length ? [] : [...augmentedColumns],
    );
  };

  return (
    <DrawerFormProvider drawerForm={editDrawerForm}>
      <List
        createButtonProps={createButtonProps}
        headerButtons={({ defaultButtons }) => (
          <Space>
            <PopoverSelect
              options={augmentedColumns}
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

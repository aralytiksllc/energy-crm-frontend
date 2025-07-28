import { useMemo, useCallback, useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { List, useTable, useDrawerForm } from '@refinedev/antd';
import { useGetIdentity } from '@refinedev/core';
import type { FormProps } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { DrawerForm } from '@components/drawer-form/drawer-form';
import { PopoverSelect } from '@components/dropdown-select';
import { DrawerFormProvider } from '@components/drawer-form';
import { ColumnFilter } from '@components/column-filter';
import { IUser } from '@interfaces/users';

export interface CrudTableProps<TData extends { id: number }> {
  resource: string;
  columns: any[];
  renderForm: (formProps: FormProps) => React.ReactNode;
  headerActions?: React.ReactNode;
  permanentFilters?: any[];
  drawerWidth?: number;
  createInitialValues?: Partial<TData>;
  showCreateButton?: boolean;
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
    headerActions,
    permanentFilters,
    drawerWidth = 720,
    createInitialValues,
    showCreateButton = true,
    drawerTitles = {},
  } = props;

  const { data: identity } = useGetIdentity<IUser>();

  const { tableProps, setFilters } = useTable<TData>({
    filters: {
      mode: 'server',
      permanent: permanentFilters,
    },
    sorters: { mode: 'server' },
    syncWithLocation: true,
    resource,
  });

  const createDrawerForm = useDrawerForm({
    action: 'create',
    resource,
    syncWithLocation: true,
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

  const handleCreate = useCallback(
    () => createDrawerForm.show(),
    [createDrawerForm.show],
  );

  const createButtonProps = useMemo(
    () => ({ onClick: handleCreate }),
    [handleCreate],
  );

  const augmentedColumns = useMemo(
    () =>
      columns.map((column: any) => {
        if (column.key === 'actions' || !column.dataIndex) {
          return column;
        }

        return {
          ...column,
          filterIcon: () => <FilterOutlined />,
          filterDropdown: () => (
            <ColumnFilter column={column} setFilters={setFilters} />
          ),
        };
      }),
    [columns, setFilters],
  );

  const [selectedColumns, setSelectedColumns] = useState(() => {
    const actionsColumn = augmentedColumns.find(
      (col: any) => col.key === 'actions',
    );
    const nonActionsColumns = augmentedColumns.filter(
      (col: any) => col.key !== 'actions',
    );

    if (actionsColumn) {
      return [...nonActionsColumns, { ...actionsColumn, fixed: 'right' }];
    }

    return augmentedColumns;
  });

  useEffect(() => {
    const actionsColumn = augmentedColumns.find(
      (col: any) => col.key === 'actions',
    );
    const nonActionsColumns = augmentedColumns.filter(
      (col: any) => col.key !== 'actions',
    );

    if (actionsColumn) {
      setSelectedColumns([
        ...nonActionsColumns,
        { ...actionsColumn, fixed: 'right' },
      ]);
    } else {
      setSelectedColumns(augmentedColumns);
    }
  }, [augmentedColumns]);

  const getDataIndexKey = useCallback((dataIndex: any) => {
    return Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex;
  }, []);

  const onSelectColumn = useCallback(
    (column: any) => {
      setSelectedColumns((prev: any[]) => {
        const map = new Map(prev.map((c) => [getDataIndexKey(c.dataIndex), c]));
        const columnKey = getDataIndexKey(column.dataIndex);

        map.has(columnKey) ? map.delete(columnKey) : map.set(columnKey, column);

        const orderedColumns = augmentedColumns.filter((col: any) =>
          map.has(getDataIndexKey(col.dataIndex)),
        );

        const actionsColumn = orderedColumns.find(
          (col: any) => col.key === 'actions',
        );
        const nonActionsColumns = orderedColumns.filter(
          (col: any) => col.key !== 'actions',
        );

        if (actionsColumn) {
          return [...nonActionsColumns, { ...actionsColumn, fixed: 'right' }];
        }

        return orderedColumns;
      });
    },
    [augmentedColumns, getDataIndexKey],
  );

  const onToggleAll = useCallback(() => {
    setSelectedColumns((prev: any[]) => {
      if (prev.length === columns.length) {
        return [];
      }

      const actionsColumn = augmentedColumns.find(
        (col: any) => col.key === 'actions',
      );
      const nonActionsColumns = augmentedColumns.filter(
        (col: any) => col.key !== 'actions',
      );

      if (actionsColumn) {
        return [...nonActionsColumns, { ...actionsColumn, fixed: 'right' }];
      }

      return [...augmentedColumns];
    });
  }, [augmentedColumns, columns.length]);

  const isUserRole = identity?.role?.name === 'user';

  return (
    <DrawerFormProvider drawerForm={editDrawerForm}>
      <List
        createButtonProps={showCreateButton ? createButtonProps : undefined}
        headerButtons={({ defaultButtons }) => (
          <Space>
            {headerActions}
            <PopoverSelect
              options={augmentedColumns}
              selected={selectedColumns}
              onSelect={onSelectColumn}
              onToggleAll={onToggleAll}
              optionKey={(col: any) => getDataIndexKey(col.dataIndex)}
              optionLabel={(col: any) => col.title}
              buttonLabel="Select Columns"
            />
            {showCreateButton && defaultButtons}
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
          title={
            isUserRole ? drawerTitles.view || 'View Details' : drawerTitles.edit
          }
          width={drawerWidth}
        />
      </List>
    </DrawerFormProvider>
  );
}

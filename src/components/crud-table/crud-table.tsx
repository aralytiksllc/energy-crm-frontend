import * as React from 'react';
import { Table, Space } from 'antd';
import { List, useTable, useDrawerForm } from '@refinedev/antd';
import { useGetIdentity } from '@refinedev/core';
import type { FormProps } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { DrawerForm } from '@components/drawer-form/drawer-form';
import { PopoverSelect } from '@components/dropdown-select';
import { DrawerFormProvider } from '@components/drawer-form';
import { ColumnFilter } from '@components/column-filter';
import { useViewMode } from '@contexts/ViewModeContext';

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

  const { viewMode } = useViewMode();
  const { data: identity } = useGetIdentity<{ id: number }>();

  const { tableProps, setFilters } = useTable<TData>({
    filters: {
      mode: 'server',
    },
    sorters: { mode: 'server' },
    syncWithLocation: true,
    resource,
    meta: {
      // Pass view mode and user info to the backend
      viewMode,
      userId: identity?.id,
    },
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

  // For user view, hide the actions column entirely
  const processedColumns = React.useMemo(() => {
    if (viewMode === 'user') {
      return columns.filter((column: any) => column.key !== 'actions');
    }
    return columns;
  }, [columns, viewMode]);

  const augmentedColumns = React.useMemo(
    () =>
      processedColumns.map((column: any) => {
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
    [processedColumns, setFilters],
  );

  const [selectedColumns, setSelectedColumns] = React.useState(() => {
    // Initialize with actions column fixed to the right
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

  React.useEffect(() => {
    // Ensure actions column is always fixed to the right when augmentedColumns change
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

  const onSelectColumn = (column: any) => {
    setSelectedColumns((prev: any[]) => {
      const map = new Map(prev.map((c) => [c.dataIndex, c]));
      map.has(column.dataIndex)
        ? map.delete(column.dataIndex)
        : map.set(column.dataIndex, column);

      // Get all columns from map, maintaining original order
      const orderedColumns = augmentedColumns.filter((col: any) =>
        map.has(col.dataIndex),
      );

      // Ensure actions column is always at the end and fixed
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
  };

  const onToggleAll = () => {
    setSelectedColumns((prev: any[]) => {
      if (prev.length === columns.length) {
        return [];
      } else {
        // When selecting all, maintain order and ensure actions column is fixed at the end
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
      }
    });
  };

  return (
    <DrawerFormProvider drawerForm={editDrawerForm}>
      <List
        createButtonProps={
          viewMode === 'manager' ? createButtonProps : undefined
        }
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
            {viewMode === 'manager' && defaultButtons}
          </Space>
        )}
      >
        <Table
          {...tableProps}
          rowKey="id"
          columns={selectedColumns}
          scroll={{ x: true }}
        />
        {viewMode === 'manager' && (
          <DrawerForm
            {...augmentedCreateDrawerForm}
            renderForm={renderForm}
            title={drawerTitles.create}
            width={drawerWidth}
          />
        )}
        <DrawerForm
          {...editDrawerForm}
          renderForm={renderForm}
          title={
            viewMode === 'user'
              ? drawerTitles.view || 'View Details'
              : drawerTitles.edit
          }
          width={drawerWidth}
        />
      </List>
    </DrawerFormProvider>
  );
}

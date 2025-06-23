// === DynamicTable.tsx ===
import React from 'react';
import { Table, Drawer, Checkbox, Button, Space, TableProps } from 'antd';
import { getRowKey } from './getRowKey';
import { keyExtractor } from './keyExtractor';

interface DynamicTableProps<T extends { id: string | number }> {
  columns: TableProps<T>['columns'];
  tableProps: TableProps<T>;
  initialVisibleKeys?: any[];
  onVisibleKeysChange?: (keys: string[]) => void;
  rowKey?: keyof T | ((record: T) => string | number);
  drawerTitle?: string;
}

export function DynamicTable<T extends { id: string | number }>({
  columns,
  tableProps,
  initialVisibleKeys,
  onVisibleKeysChange,
  rowKey = 'id',
  drawerTitle = 'Configure Columns',
}: DynamicTableProps<T>) {
  const allKeys = React.useMemo(
    () => columns?.map(keyExtractor as any) || [],
    [columns],
  );

  const [visibleKeys, setVisibleKeys] = React.useState<string[]>(
    initialVisibleKeys?.length ? initialVisibleKeys : allKeys,
  );

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const filteredColumns = React.useMemo(
    () =>
      columns?.filter((col: any) => visibleKeys.includes(keyExtractor(col))) ||
      [],
    [columns, visibleKeys],
  );

  const columnOptions = React.useMemo(
    () =>
      columns?.map((col: any) => ({
        label: col.title,
        value: keyExtractor(col),
      })) || [],
    [columns],
  );

  const handleToggleKey = (key: string, checked: boolean) => {
    const next = checked
      ? [...visibleKeys, key]
      : visibleKeys.filter((k) => k !== key);
    setVisibleKeys(next);
    onVisibleKeysChange?.(next);
  };

  const resolvedRowKey =
    typeof rowKey === 'function' ? rowKey : getRowKey<T>(rowKey);

  return (
    <>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={() => setIsDrawerOpen(true)}>⚙ {drawerTitle}</Button>
      </Space>

      <Table<T>
        {...tableProps}
        rowKey={resolvedRowKey}
        columns={filteredColumns}
      />

      <Drawer
        title={drawerTitle}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Space direction="vertical">
          {columnOptions.map((option) => (
            <Checkbox
              key={option.value}
              checked={visibleKeys.includes(option.value)}
              onChange={(e) => handleToggleKey(option.value, e.target.checked)}
            >
              {option.label}
            </Checkbox>
          ))}
        </Space>
      </Drawer>
    </>
  );
}

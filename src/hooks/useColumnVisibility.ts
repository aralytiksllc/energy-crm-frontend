import { useState, useMemo } from 'react';
import { ColumnsType } from 'antd/es/table';
import { ColumnOption } from '@components/column-visibility-selector';

export function useColumnVisibility<T = any>(
  allColumns: ColumnsType<T>,
  storageKey: string,
  excludeColumns: string[] = ['actions'],
) {
  const columnOptions: ColumnOption[] = useMemo(() => {
    return allColumns
      .filter((col) => {
        const columnKey =
          ((col as any).dataIndex as string) || (col.key as string);
        return col.title && !excludeColumns.includes(columnKey);
      })
      .map((col) => ({
        value: ((col as any).dataIndex as string) || (col.key as string),
        label: col.title as string,
        disableCustom: false,
      }));
  }, [allColumns, excludeColumns]);

  const initialVisibleColumns = useMemo(() => {
    return columnOptions.map((option) => option.value);
  }, [columnOptions]);

  const [visibleColumns, setVisibleColumnsState] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : initialVisibleColumns;
    } catch {
      return initialVisibleColumns;
    }
  });

  const setVisibleColumns = (newVisibleColumns: string[]) => {
    // Update state
    setVisibleColumnsState(newVisibleColumns);

    try {
      localStorage.setItem(storageKey, JSON.stringify(newVisibleColumns));
    } catch {
      // Ignore localStorage errors (e.g., quota exceeded, private browsing)
    }
  };

  const filteredColumns = useMemo(() => {
    return allColumns.filter((col) => {
      const columnKey =
        ((col as any).dataIndex as string) || (col.key as string);
      if (excludeColumns.includes(columnKey)) {
        return true;
      }
      return visibleColumns.includes(columnKey);
    });
  }, [allColumns, visibleColumns, excludeColumns]);

  return {
    columnOptions,
    visibleColumns,
    setVisibleColumns,
    filteredColumns,
  };
}

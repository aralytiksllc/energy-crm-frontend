// This is a new file
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { LogicalFilter } from '@refinedev/core';
import { filterOperators } from './constants';
import { ColumnFilterProps } from './column-filter.types';
import { ColumnType } from 'antd/es/table';
import { useColumnFilterStyles } from './column-filter.styles';

export const ColumnFilter: FC<ColumnFilterProps> = ({
  setFilters,
  columns = [],
}) => {
  const { styles } = useColumnFilterStyles();

  const [filterValues, setFilterValues] = useState({
    field: '',
    operator: 'contains' as const,
    value: '',
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        filterValues.value === '' ||
        filterValues.value === null ||
        filterValues.value === undefined
      ) {
        setFilters([], 'replace');
      } else if (filterValues.field && filterValues.operator) {
        const filter: LogicalFilter = {
          field: filterValues.field,
          operator: filterValues.operator,
          value: filterValues.value,
        };
        setFilters([filter], 'replace');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    filterValues.value,
    filterValues.field,
    filterValues.operator,
    setFilters,
  ]);

  const handleFieldChange = useCallback(
    (field: string) => {
      setFilterValues({
        ...filterValues,
        field,
        value: '',
      });
    },
    [filterValues],
  );

  const handleOperatorChange = useCallback(
    (operator: any) => {
      setFilterValues({
        ...filterValues,
        operator,
        value: '',
      });
    },
    [filterValues],
  );

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValues({
        ...filterValues,
        value: e.target.value,
      });
    },
    [filterValues],
  );

  const fieldOptions = useMemo(() => {
    return columns
      .filter((column): column is ColumnType<any> & { dataIndex: string } =>
        Boolean(column.dataIndex),
      )
      .map((column) => ({
        label: (column.title as string) || column.dataIndex,
        value: column.dataIndex,
      }));
  }, [columns]);

  return (
    <div className={styles.container}>
      <Space direction="horizontal" size="small">
        <Select
          className={styles.input}
          placeholder="Select field"
          value={filterValues.field || undefined}
          onChange={handleFieldChange}
          style={{ width: 150 }}
        >
          {fieldOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          className={styles.input}
          placeholder="Select operator"
          value={filterValues.operator}
          onChange={handleOperatorChange}
          style={{ width: 120 }}
        >
          {filterOperators.map((operator) => (
            <Select.Option key={operator.value} value={operator.value}>
              {operator.label}
            </Select.Option>
          ))}
        </Select>

        <Input
          className={styles.input}
          placeholder="Type to filter..."
          value={filterValues.value}
          onChange={handleValueChange}
          allowClear
          style={{ width: '100%' }}
        />
      </Space>
    </div>
  );
};

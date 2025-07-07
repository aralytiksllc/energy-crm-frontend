import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Input, Select, Space, DatePicker, InputNumber } from 'antd';
import { LogicalFilter } from '@refinedev/core';
import { dateOperators, numberOperators, textOperators } from './constants';
import { ColumnFilterProps } from './column-filter.types';
import { useColumnFilterStyles } from './column-filter.styles';

export const ColumnFilter: FC<ColumnFilterProps<any>> = ({
  column,
  setFilters,
}) => {
  const { styles } = useColumnFilterStyles();
  const { dataIndex, filterType = 'text' } = column;

  const [filterValues, setFilterValues] = useState({
    operator: filterType === 'text' ? 'ilike' : 'eq',
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
      } else if (dataIndex && filterValues.operator) {
        const filter: LogicalFilter = {
          field: dataIndex.toString(),
          operator: filterValues.operator as any,
          value: filterValues.value,
        };
        setFilters([filter], 'replace');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filterValues.value, filterValues.operator, dataIndex, setFilters]);

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
    (value: any) => {
      setFilterValues({
        ...filterValues,
        value,
      });
    },
    [filterValues],
  );

  const operatorOptions = useMemo(() => {
    switch (filterType) {
      case 'number':
        return numberOperators;
      case 'date':
        return dateOperators;
      case 'text':
      default:
        return textOperators;
    }
  }, [filterType]);

  const renderInput = () => {
    switch (filterType) {
      case 'number':
        return (
          <InputNumber
            className={styles.input}
            placeholder="Enter value"
            value={filterValues.value as any}
            onChange={handleValueChange}
            style={{ width: '100%' }}
          />
        );
      case 'date':
        return (
          <DatePicker
            className={styles.input}
            placeholder="Select date"
            value={filterValues.value as any}
            onChange={handleValueChange}
            style={{ width: '100%' }}
          />
        );
      case 'text':
      default:
        return (
          <Input
            className={styles.input}
            placeholder="Type to filter..."
            value={filterValues.value}
            onChange={(e) => handleValueChange(e.target.value)}
            allowClear
            style={{ width: '100%' }}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <Space direction="horizontal" size="small">
        <Select
          className={styles.input}
          placeholder="Select operator"
          value={filterValues.operator}
          onChange={handleOperatorChange}
          style={{ width: 120 }}
        >
          {operatorOptions.map((operator: { value: string; label: string }) => (
            <Select.Option key={operator.value} value={operator.value}>
              {operator.label}
            </Select.Option>
          ))}
        </Select>

        {renderInput()}
      </Space>
    </div>
  );
};

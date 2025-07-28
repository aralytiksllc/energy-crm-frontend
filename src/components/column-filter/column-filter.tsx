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
  const { styles, cx } = useColumnFilterStyles();
  const { dataIndex, filterType = 'text' } = column;

  const [filterValues, setFilterValues] = useState({
    operator: filterType === 'text' ? 'ilike' : 'eq',
    value: '',
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isEmptyValue =
        filterValues.value === '' ||
        filterValues.value === null ||
        filterValues.value === undefined;

      if (isEmptyValue) {
        setFilters([], 'replace');
        return;
      }

      if (!dataIndex || !filterValues.operator) {
        return;
      }

      const field = Array.isArray(dataIndex)
        ? dataIndex.join('.')
        : dataIndex.toString();

      const isLikeOperator = ['ilike', 'like'].includes(filterValues.operator);
      const value = isLikeOperator
        ? `%${filterValues.value}%`
        : filterValues.value;

      const filter: LogicalFilter = {
        field,
        operator: filterValues.operator as any,
        value,
      };

      setFilters([filter], 'replace');
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
            className={cx(styles.input, styles.fullWidth)}
            placeholder="Enter value"
            value={filterValues.value as any}
            onChange={handleValueChange}
          />
        );
      case 'date':
        return (
          <DatePicker
            className={cx(styles.input, styles.fullWidth)}
            placeholder="Select date"
            value={filterValues.value as any}
            onChange={handleValueChange}
          />
        );
      case 'text':
      default:
        return (
          <Input
            className={cx(styles.input, styles.fullWidth)}
            placeholder="Type to filter..."
            value={filterValues.value}
            onChange={(e) => handleValueChange(e.target.value)}
            allowClear
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <Space direction="horizontal" size="small">
        <Select
          className={cx(styles.input, styles.operatorSelect)}
          placeholder="Select operator"
          value={filterValues.operator}
          onChange={handleOperatorChange}
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

// This is a new file
import React, { FC, useCallback } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import {
  CrudFilters,
  useTranslate,
  CrudOperators,
  LogicalFilter,
} from '@refinedev/core';
import { filterOperators } from './constants';
import { ColumnFilterProps } from './column-filter.types';
import { ColumnType } from 'antd/es/table';
import { useColumnFilterStyles } from './column-filter.styles';

export const ColumnFilter: FC<ColumnFilterProps> = ({
  columns,
  setFilters,
  defaultField,
}) => {
  const { styles } = useColumnFilterStyles();
  const [form] = Form.useForm();
  const translate = useTranslate();

  const handleFilter = useCallback(
    (values: { field: string; operator: CrudOperators; value: any }) => {
      const newFilters: LogicalFilter[] = [
        {
          field: values.field,
          operator: values.operator as any,
          value: values.value,
        },
      ];
      setFilters(newFilters, 'replace');
    },
    [setFilters],
  );

  const handleClearFilter = useCallback(() => {
    setFilters([], 'replace');
    form.resetFields();
  }, [setFilters, form]);

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onFinish={handleFilter}
        layout="vertical"
        initialValues={{ operator: 'eq', field: defaultField }}
      >
        <Space direction="horizontal">
          <Form.Item name="field" noStyle>
            <Select className={styles.input}>
              {columns.map((column: ColumnType<object>) => {
                if (column.key === 'actions' || !column.key) {
                  return null;
                }
                return (
                  <Select.Option key={column.key} value={column.key as string}>
                    {column.title as string}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="operator" noStyle>
            <Select className={styles.input}>
              {filterOperators.map((operator) => (
                <Select.Option key={operator.value} value={operator.value}>
                  {operator.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="value" noStyle>
            <Input className={styles.input} />
          </Form.Item>
        </Space>
        <Space className={styles.buttonsContainer}>
          <Button onClick={handleClearFilter} size="small">
            {translate('table.filter.clear', 'Clear')}
          </Button>
          <Button type="primary" htmlType="submit" size="small">
            {translate('table.filter.apply', 'Apply')}
          </Button>
        </Space>
      </Form>
    </div>
  );
};

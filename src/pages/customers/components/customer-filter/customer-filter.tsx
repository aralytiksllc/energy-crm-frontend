// External
import * as React from 'react';
import { Space, Button, Typography, Select, Form } from 'antd';
import { Link } from '@refinedev/core';
import { PlusOutlined } from '@ant-design/icons';

// Internal
import { stageOptions } from '@/constants/stage-options';
import { Search } from '@/components/search';
import { useStyles } from './customer-filter.styles';
import type { CustomerFilterProps } from './customer-filter.types';

const newCustomerLinkProps = {
  to: { resource: 'customers', action: 'create' },
  options: { keepQuery: true },
} as const;

export const CustomerFilter: React.FC<CustomerFilterProps> = (props) => {
  const { searchTerm, onSearchTermChange, onStageChange } = props;

  const { styles } = useStyles();

  return (
    <Space
      className={styles.filter}
      direction="vertical"
      size="large"
      wrap={false}
    >
      <Link go={newCustomerLinkProps}>
        <Button icon={<PlusOutlined />} type="primary" block>
          New Customer
        </Button>
      </Link>
      <Search
        placeholder="Search by business name..."
        onSearch={onSearchTermChange}
        defaultValue={searchTerm}
        delayTimeout={500}
        delaySearch={true}
        allowClear={true}
      />
      <Form layout="vertical">
        <Form.Item label="Filter by Stage:" name="stage">
          <Select
            options={stageOptions}
            onChange={(value) => {
              console.log('Stage changed:', value);
              // këtu dërgo change-in ku të duash
            }}
          />
        </Form.Item>
      </Form>
    </Space>
  );
};

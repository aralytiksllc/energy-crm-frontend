// External
import * as React from 'react';
import { Space, Button, Typography, Select } from 'antd';
import { Link } from '@refinedev/core';
import { PlusOutlined } from '@ant-design/icons';

// Internal
import { stageOptions } from '@/constants/stage-options';
import { Search } from '@/components/search';
import { useStyles } from './customer-filter.styles';
import type { CustomerFilterProps } from './customer-filter.types';

const { Text } = Typography;
const { Option } = Select;

const newCustomerLinkProps = {
  to: { resource: 'customers', action: 'create' },
  options: { keepQuery: true },
} as const;

export const CustomerFilter: React.FC<CustomerFilterProps> = (props) => {
  const { searchTerm, onSearchTermChange, onStageChange } =
    props;

  const { styles } = useStyles();

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      onStageChange('', false);
    } else {
      onStageChange(value, true);
    }
  };

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
      <div>
        <Text strong style={{ display: 'block', marginBottom: '8px' }}>
          Filter by Stage:
        </Text>
        <Select
          defaultValue="all"
          style={{ width: '50%' }}
          onChange={handleFilterChange}
          placeholder="Select a stage"
        >
          <Option value="all">All</Option>
          {stageOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </Space>
  );
};

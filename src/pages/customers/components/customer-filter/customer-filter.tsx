// External
import * as React from 'react';
import { Space, Button, Typography } from 'antd';
import { Link } from '@refinedev/core';
import { PlusOutlined } from '@ant-design/icons';

// Internal
import { stageOptions } from '@/constants/stage-options';
import { Search } from '@/components/search';
import { CheckableTagGroup } from '@/components/checkable-tag';
import { useStyles } from './customer-filter.styles';
import type { CustomerFilterProps } from './customer-filter.types';

const { Text } = Typography;

const newCustomerLinkProps = {
  to: { resource: 'customers', action: 'create' },
  options: { keepQuery: true },
} as const;

export const CustomerFilter: React.FC<CustomerFilterProps> = (props) => {
  const { searchTerm, onSearchTermChange, selectedStages, onStageChange } =
    props;

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
      <CheckableTagGroup
        prefix={<Text strong>Filters:</Text>}
        onChange={onStageChange}
        options={stageOptions}
        value={selectedStages}
      />
    </Space>
  );
};

import React from 'react';
import { List, useTable, EditButton, ShowButton, DeleteButton } from '@refinedev/antd';
import { Table, Space, Tag, Typography } from 'antd';
import { IContract, ContractStatus, ContractType } from '@interfaces/contracts';
import { useContractsStyles } from './contracts.styles';

const { Text } = Typography;

export const Contracts: React.FC = () => {
  const { styles } = useContractsStyles();
  
  const { tableProps } = useTable<IContract>({
    resource: 'contracts',
    pagination: {
      pageSize: 10,
    },
  });

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case ContractStatus.ACTIVE:
        return 'green';
      case ContractStatus.DRAFT:
        return 'blue';
      case ContractStatus.COMPLETED:
        return 'purple';
      case ContractStatus.CANCELLED:
        return 'red';
      case ContractStatus.EXPIRED:
        return 'orange';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: ContractType) => {
    switch (type) {
      case ContractType.SERVICE:
        return 'blue';
      case ContractType.PRODUCT:
        return 'green';
      case ContractType.MAINTENANCE:
        return 'orange';
      case ContractType.CONSULTING:
        return 'purple';
      case ContractType.LICENSING:
        return 'cyan';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: ['customer', 'name'],
      key: 'customer',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: ContractType) => (
        <Tag color={getTypeColor(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ContractStatus) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number, record: IContract) => (
        <Text>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: record.currency,
          }).format(value)}
        </Text>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IContract) => (
        <Space>
          <ShowButton hideText size="small" recordItemId={record.id} />
          <EditButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List>
      <Table
        {...tableProps}
        columns={columns}
        rowKey="id"
        className={styles.table}
      />
    </List>
  );
};

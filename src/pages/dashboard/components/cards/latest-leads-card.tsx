import React from 'react';
import { Card, Typography, Table, Tag, Avatar, Space } from 'antd';
import type { LatestLeadsCardProps } from '../../types/dashboard-tables.types';
import { useDashboardTablesStyles } from '../dashboard-tables.styles';

const { Title, Text } = Typography;

const LatestLeadsCard: React.FC<LatestLeadsCardProps> = ({ leads }) => {
  const { styles } = useDashboardTablesStyles();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar className={styles.avatar} size="small">
            {record.initials}
          </Avatar>
          <Text strong className={styles.leadName}>
            {text}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (source: string) => (
        <Text className={styles.leadSource}>{source}</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="blue" className={styles.statusTag}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <Text className={styles.leadDate}>{date}</Text>,
    },
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <Title level={4} className={styles.cardTitle}>
          Latest Leads
        </Title>
        <Text className={styles.cardDescription}>
          Most recent lead acquisitions
        </Text>
      </div>

      <Table
        dataSource={leads}
        columns={columns}
        pagination={false}
        size="small"
        showHeader={true}
      />
    </Card>
  );
};

export default LatestLeadsCard;

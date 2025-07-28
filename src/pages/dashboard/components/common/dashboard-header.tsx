import React from 'react';
import { Card, Space, Typography, DatePicker, Select } from 'antd';
import { IUser } from '@interfaces/index';
import { Dayjs } from 'dayjs';
import { useDashboardHeaderStyles } from './dashboard-header.styles';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface DashboardHeaderProps {
  currentUser?: IUser;
  dashboardType: 'user' | 'manager';
  quickFilter: string;
  dateRange: [Dayjs, Dayjs] | null;
  onQuickFilterChange: (value: string) => void;
  onDateRangeChange: (dates: any) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentUser,
  dashboardType,
  quickFilter,
  dateRange,
  onQuickFilterChange,
  onDateRangeChange,
}) => {
  const { styles } = useDashboardHeaderStyles();
  const dashboardTitle =
    dashboardType === 'user' ? 'My Dashboard' : 'Manager Dashboard';

  return (
    <Card>
      <div className={styles.headerContainer}>
        <div>
          <Title level={3}>
            Welcome back, {currentUser?.firstName} {currentUser?.lastName}!
          </Title>
          <Text type="secondary">{dashboardTitle}</Text>
        </div>
        <div>
          <Space size="large">
            <Space align="center">
              <Text strong>Time Period:</Text>
              <Select
                value={quickFilter}
                onChange={onQuickFilterChange}
                className={styles.selectStyle}
              >
                <Select.Option value="week">This Week</Select.Option>
                <Select.Option value="month">This Month</Select.Option>
                <Select.Option value="quarter">This Quarter</Select.Option>
                <Select.Option value="year">This Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
            </Space>
            {quickFilter === 'custom' && (
              <RangePicker
                value={dateRange}
                onChange={onDateRangeChange}
                format="MMM DD, YYYY"
              />
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};

import React from 'react';
import { Space } from 'antd';
import { DashboardHeader } from './dashboard-header';
import { useUserDashboardStyles } from '../user-dashboard.styles';

interface DashboardLayoutProps {
  currentUser?: any;
  dashboardType: 'user' | 'manager';
  quickFilter: string;
  dateRange: any;
  onQuickFilterChange: (value: string) => void;
  onDateRangeChange: (dates: any) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentUser,
  dashboardType,
  quickFilter,
  dateRange,
  onQuickFilterChange,
  onDateRangeChange,
  children,
}) => {
  const { styles } = useUserDashboardStyles();

  return (
    <Space direction="vertical" size="large" className={styles.verticalSpace}>
      <DashboardHeader
        currentUser={currentUser}
        dashboardType={dashboardType}
        quickFilter={quickFilter}
        dateRange={dateRange}
        onQuickFilterChange={onQuickFilterChange}
        onDateRangeChange={onDateRangeChange}
      />
      {children}
    </Space>
  );
};

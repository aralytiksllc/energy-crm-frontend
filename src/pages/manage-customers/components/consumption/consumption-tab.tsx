import React from 'react';
import { Space } from 'antd';
import { UploadSection } from './upload-section';
import { DataSummary } from './data-summary';
import { ConsumptionTable } from './consumption-table';

export const ConsumptionTab: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <UploadSection />
      <DataSummary />
      <ConsumptionTable />
    </Space>
  );
};

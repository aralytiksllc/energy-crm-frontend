import { Space, Skeleton, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const KanbanColumnSkeleton = () => (
  <div style={{ padding: '0 16px', width: 260 }}>
    <div style={{ padding: 12 }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Skeleton.Button size="small" style={{ width: 120 }} />
        <Button shape="circle" icon={<PlusOutlined />} disabled />
      </Space>
    </div>
    <Skeleton active paragraph={{ rows: 6 }} />
  </div>
);

import { Card, Skeleton } from 'antd';

export const KanbanCardSkeleton = () => (
  <Card size="small">
    <Skeleton active paragraph={{ rows: 1 }} />
  </Card>
);

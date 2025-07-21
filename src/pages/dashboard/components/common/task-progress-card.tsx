import React from 'react';
import { Card, Row, Col, Typography, Progress } from 'antd';
import { TicketStats } from '../../utils';
import { TaskType } from '@interfaces/task-type.enum';
import { useTaskProgressCardStyles } from './task-progress-card.styles';
import { TASK_TYPE_CONFIG } from '../../constants/task-progress-card.constants';

const { Title, Text } = Typography;

interface TaskProgressCardProps {
  ticketStats: TicketStats;
  title?: string;
}

export const TaskProgressCard: React.FC<TaskProgressCardProps> = ({
  ticketStats,
  title = 'Task Progress',
}) => {
  const { styles } = useTaskProgressCardStyles();
  const completionRate =
    ticketStats.total > 0
      ? Math.round((ticketStats.completed / ticketStats.total) * 100)
      : 0;

  const activeTaskTypes = Object.values(TaskType).filter(
    (taskType) => ticketStats[taskType as keyof TicketStats] > 0,
  );

  const taskTypeRows = [];
  for (let i = 0; i < activeTaskTypes.length; i += 3) {
    taskTypeRows.push(activeTaskTypes.slice(i, i + 3));
  }

  return (
    <Card title={title}>
      <div className={styles.container}>
        <div className={styles.progressSection}>
          <Text strong>Completion Progress</Text>
        </div>
        <Progress
          percent={completionRate}
          strokeColor={{
            '0%': 'var(--color-progress-start)',
            '100%': 'var(--color-progress-end)',
          }}
          status={completionRate === 100 ? 'success' : 'active'}
        />
        <div className={styles.statsSection}>
          {activeTaskTypes.length > 0 ? (
            taskTypeRows.map((row, rowIndex) => (
              <Row
                gutter={16}
                key={rowIndex}
                className={
                  rowIndex < taskTypeRows.length - 1 ? styles.rowWithMargin : ''
                }
              >
                {row.map((taskType) => {
                  const config = TASK_TYPE_CONFIG[taskType];
                  const count = ticketStats[taskType as keyof TicketStats];

                  return (
                    <Col span={8} key={taskType}>
                      <div className={styles.statContainer}>
                        <Title
                          level={5}
                          className={
                            styles[config.className as keyof typeof styles]
                          }
                          style={{ color: config.color }}
                        >
                          {count}
                        </Title>
                        <Text type="secondary" className={styles.smallText}>
                          {config.label}
                        </Text>
                      </div>
                    </Col>
                  );
                })}
                {Array.from({ length: 3 - row.length }).map((_, index) => (
                  <Col span={8} key={`empty-${rowIndex}-${index}`}>
                    <div className={styles.statContainer} />
                  </Col>
                ))}
              </Row>
            ))
          ) : (
            <div className={styles.emptyState}>
              <Text type="secondary">No tasks found</Text>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

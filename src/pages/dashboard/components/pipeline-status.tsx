import React, { useMemo } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import type { Task } from '../../../interfaces/task';
import type { ProjectSummary } from '@modules/projects/api/projects';
import { usePipelineStatusStyles } from './pipeline-status.styles';

const { Title, Text } = Typography;

interface PipelineStatusProps {
  tasks: Task[];
  projects: ProjectSummary[];
}

interface PipelineStage {
  name: string;
  count: number;
  color: string;
}

const PipelineStatus: React.FC<PipelineStatusProps> = ({ projects }) => {
  const { styles } = usePipelineStatusStyles();
  const pipelineData = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.isActive).length;

    // Mock pipeline stages based on project status
    const stages: PipelineStage[] = [
      { name: 'Lead', count: 3, color: 'var(--color-status-lead)' },
      { name: 'Qualified', count: 4, color: 'var(--color-status-qualified)' },
      { name: 'Proposal', count: 4, color: 'var(--color-status-proposal)' },
      {
        name: 'Negotiation',
        count: 5,
        color: 'var(--color-status-negotiation)',
      },
      { name: 'Closed Won', count: 4, color: 'var(--color-status-closed-won)' },
      {
        name: 'Closed Lost',
        count: 0,
        color: 'var(--color-status-closed-lost)',
      },
    ];

    return { stages, totalProjects, activeProjects };
  }, [projects]);

  const totalStageCount = pipelineData.stages.reduce(
    (sum, stage) => sum + stage.count,
    0,
  );

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          Pipeline Status
        </Title>
        <Text className={styles.subtitle}>Current deals by stage</Text>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statsRow}>
          <Text strong className={styles.statText}>
            Total Projects: {pipelineData.totalProjects}
          </Text>
          <Text strong className={styles.statText}>
            Active Projects: {pipelineData.activeProjects}
          </Text>
        </div>

        {/* Pipeline Progress Bar */}
        <div className={styles.progressBar}>
          {pipelineData.stages.map((stage, index) => {
            const percentage =
              totalStageCount > 0 ? (stage.count / totalStageCount) * 100 : 0;
            const prevPercentage = pipelineData.stages
              .slice(0, index)
              .reduce(
                (sum, s) =>
                  sum +
                  (totalStageCount > 0 ? (s.count / totalStageCount) * 100 : 0),
                0,
              );

            return (
              <div
                key={stage.name}
                className={styles.progressSegment}
                style={{
                  left: `${prevPercentage}%`,
                  width: `${percentage}%`,
                  backgroundColor: stage.color,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Pipeline Stages */}
      <Row gutter={[24, 16]}>
        {pipelineData.stages.map((stage) => (
          <Col span={4} key={stage.name}>
            <div className={styles.stageContainer}>
              <Text className={styles.stageName}>{stage.name}</Text>
              <Text
                className={styles.stageCount}
                style={{ color: stage.color }}
              >
                {stage.count}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default PipelineStatus;

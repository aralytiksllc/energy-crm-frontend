import React, { useMemo } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import type { Task } from '@modules/tasks/types';
import type { ProjectSummary } from '@modules/projects/api/projects';

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
  const pipelineData = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((p) => p.isActive).length;

    // Mock pipeline stages based on project status
    const stages: PipelineStage[] = [
      { name: 'Lead', count: 3, color: '#1890ff' },
      { name: 'Qualified', count: 4, color: '#52c41a' },
      { name: 'Proposal', count: 4, color: '#faad14' },
      { name: 'Negotiation', count: 5, color: '#722ed1' },
      { name: 'Closed Won', count: 4, color: '#52c41a' },
      { name: 'Closed Lost', count: 0, color: '#ff4d4f' },
    ];

    return { stages, totalProjects, activeProjects };
  }, [projects]);

  const totalStageCount = pipelineData.stages.reduce(
    (sum, stage) => sum + stage.count,
    0,
  );

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        marginBottom: 24,
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0, color: '#262626' }}>
          Pipeline Status
        </Title>
        <Text style={{ color: '#8C8C8C', fontSize: 14 }}>
          Current deals by stage
        </Text>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text strong style={{ fontSize: 16 }}>
            Total Projects: {pipelineData.totalProjects}
          </Text>
          <Text strong style={{ fontSize: 16 }}>
            Active Projects: {pipelineData.activeProjects}
          </Text>
        </div>

        {/* Pipeline Progress Bar */}
        <div
          style={{
            background: '#f0f0f0',
            borderRadius: 8,
            height: 8,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
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
                style={{
                  position: 'absolute',
                  left: `${prevPercentage}%`,
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: stage.color,
                  transition: 'all 0.3s ease',
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
            <div style={{ textAlign: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: '#8C8C8C',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {stage.name}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: stage.color,
                  display: 'block',
                }}
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

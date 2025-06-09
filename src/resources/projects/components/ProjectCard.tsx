import React from 'react';
import { Card, Typography } from 'antd';
import { projectCardStyles } from '../constants/styles';

const { Title, Paragraph } = Typography;

interface ProjectCardProps {
  title: string;
  description?: string;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  extra,
  children,
  className = '',
}: ProjectCardProps) {
  return (
    <Card
      className={className}
      style={projectCardStyles.card as React.CSSProperties}
      styles={{
        body: projectCardStyles.body,
        header: projectCardStyles.header,
      }}
      variant={projectCardStyles.variant}
      title={
        <Title level={5} style={{ margin: 0, fontSize: 16 }}>
          {title}
        </Title>
      }
      extra={extra}
      hoverable
    >
      {description && (
        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
          {description}
        </Paragraph>
      )}
      {children}
    </Card>
  );
}

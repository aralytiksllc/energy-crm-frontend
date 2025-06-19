// External imports
import * as React from 'react';
import { Descriptions, Tag, Progress, Typography, Space, Divider } from 'antd';
import { Show } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import dayjs from 'dayjs';

// Internal imports
import { IProject } from './types/types';
import {
  formatProjectStatus,
  formatProjectPriority,
  getStatusColor,
  getPriorityColor,
} from './utils/project-transformer';
import { projectShowStyles, richTextCSS } from './projects-show.styles';

const { Text, Title } = Typography;

export const ProjectsShow: React.FC = () => {
  const { query } = useShow<IProject>();
  const { data, isLoading } = query;
  const record = data?.data;

  if (!record) {
    return <Show isLoading={isLoading} />;
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'Not set';
    return dayjs(date).format('MMMM D, YYYY');
  };

  const formatDateTime = (date: Date | string | undefined): string => {
    if (!date) return 'Not set';
    return dayjs(date).format('MMMM D, YYYY [at] h:mm A');
  };

  const renderArrayField = (
    items: string[] | undefined,
    emptyText = 'None',
  ): React.ReactNode => {
    if (!items || items.length === 0) {
      return <Text type="secondary">{emptyText}</Text>;
    }

    return (
      <Space wrap>
        {items.map((item, index) => (
          <Tag key={index} color="blue">
            {item}
          </Tag>
        ))}
      </Space>
    );
  };

  const renderRichTextContent = (content: string): React.ReactNode => {
    return (
      <div
        style={projectShowStyles.richTextContainer}
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <>
      <style>{richTextCSS}</style>
      <Show isLoading={isLoading}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Basic Information */}
          <div>
            <Title level={4}>Basic Information</Title>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Project ID" span={1}>
                <Text strong>{record.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Project Name" span={1}>
                <Text strong>{record.name}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {record.description ? (
                  renderRichTextContent(record.description)
                ) : (
                  <Text type="secondary">No description provided</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Category" span={1}>
                {record.category ? (
                  <Tag color="geekblue">{record.category}</Tag>
                ) : (
                  <Text type="secondary">Not categorized</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Client" span={1}>
                {record.clientName ? (
                  <Text strong>{record.clientName}</Text>
                ) : (
                  <Text type="secondary">No client assigned</Text>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Status & Progress */}
          <div>
            <Title level={4}>Status & Progress</Title>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Status" span={1}>
                <Tag color={getStatusColor(record.status)}>
                  {formatProjectStatus(record.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Priority" span={1}>
                <Tag color={getPriorityColor(record.priority)}>
                  {formatProjectPriority(record.priority)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Progress" span={2}>
                <Progress
                  percent={record.progress}
                  status={record.progress === 100 ? 'success' : 'active'}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Archived" span={1}>
                <Tag color={record.isArchived ? 'orange' : 'green'}>
                  {record.isArchived ? 'Yes' : 'No'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Private" span={1}>
                <Tag color={record.isPrivate ? 'red' : 'blue'}>
                  {record.isPrivate ? 'Yes' : 'No'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Financial & Timeline */}
          <div>
            <Title level={4}>Financial & Timeline</Title>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Budget" span={1}>
                <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
                  {formatCurrency(record.budget)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Project Manager ID" span={1}>
                {record.projectManagerId ? (
                  <Text>Manager #{record.projectManagerId}</Text>
                ) : (
                  <Text type="secondary">Not assigned</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Start Date" span={1}>
                <Text>{formatDate(record.startDate)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Deadline" span={1}>
                {record.deadline ? (
                  <Text
                    style={{
                      color: dayjs(record.deadline).isBefore(dayjs())
                        ? '#ff4d4f'
                        : undefined,
                    }}
                  >
                    {formatDate(record.deadline)}
                    {dayjs(record.deadline).isBefore(dayjs()) && ' (Overdue)'}
                  </Text>
                ) : (
                  <Text type="secondary">No deadline set</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="End Date" span={2}>
                {record.endDate ? (
                  <Text>{formatDate(record.endDate)}</Text>
                ) : (
                  <Text type="secondary">Not completed</Text>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Technical Details */}
          <div>
            <Title level={4}>Technical Details</Title>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Technologies">
                {renderArrayField(
                  record.technologies,
                  'No technologies specified',
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Tags">
                {renderArrayField(record.tags, 'No tags assigned')}
              </Descriptions.Item>
              <Descriptions.Item label="Color">
                {record.color ? (
                  <Space>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: record.color,
                        border: '1px solid #d9d9d9',
                        borderRadius: 4,
                      }}
                    />
                    <Text code>{record.color}</Text>
                  </Space>
                ) : (
                  <Text type="secondary">No color assigned</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Notes">
                {record.notes ? (
                  renderRichTextContent(record.notes)
                ) : (
                  <Text type="secondary">No notes available</Text>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Team Members */}
          <div>
            <Title level={4}>Team Members</Title>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Members">
                {record.members && record.members.length > 0 ? (
                  <Space direction="vertical" size="small">
                    {record.members.map((member) => (
                      <div key={member.id}>
                        <Space>
                          <Tag color="blue">{member.role}</Tag>
                          <Text>{member.user?.name || 'Unknown User'}</Text>
                          <Tag color={member.isActive ? 'green' : 'red'}>
                            {member.isActive ? 'Active' : 'Inactive'}
                          </Tag>
                        </Space>
                      </div>
                    ))}
                  </Space>
                ) : (
                  <Text type="secondary">No team members assigned</Text>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* System Information */}
          <div>
            <Title level={4}>System Information</Title>
            <Descriptions bordered column={2} size="middle">
              <Descriptions.Item label="Created At" span={1}>
                <Text>{formatDateTime(record.createdAt)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Updated At" span={1}>
                <Text>{formatDateTime(record.updatedAt)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Created By" span={1}>
                {record.createdById ? (
                  <Text>User #{record.createdById}</Text>
                ) : (
                  <Text type="secondary">System</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Updated By" span={1}>
                {record.updatedById ? (
                  <Text>User #{record.updatedById}</Text>
                ) : (
                  <Text type="secondary">System</Text>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Space>
      </Show>
    </>
  );
};

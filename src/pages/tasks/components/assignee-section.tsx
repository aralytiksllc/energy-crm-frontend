import React from 'react';
import {
  Space,
  Card,
  Row,
  Col,
  Select,
  InputNumber,
  Button,
  Avatar,
  Typography,
  Flex,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAssigneeSectionStyles } from './assignee-section.styles';
import type {
  TaskAssignee,
  User,
} from '@/components/task-form/task-form.types';

const { Text } = Typography;

export interface AssigneeSectionProps {
  assignees: TaskAssignee[];
  users: User[];
  disabled?: boolean;
  onAssigneesChange: (assignees: TaskAssignee[]) => void;
  renderAssigneeSection?: () => React.ReactNode;
}

export const useAssigneeSection = ({
  assignees,
  users,
  disabled = false,
  onAssigneesChange,
}: AssigneeSectionProps) => {
  const { styles } = useAssigneeSectionStyles();

  const handleAddAssignee = () => {
    const newAssignees = [...assignees, { userId: 0, estimatedHours: 0 }];
    onAssigneesChange(newAssignees);
  };

  const handleRemoveAssignee = (index: number) => {
    const newAssignees = assignees.filter((_, i) => i !== index);
    onAssigneesChange(newAssignees);
  };

  const handleAssigneeChange = (
    index: number,
    field: 'userId' | 'estimatedHours',
    value: any,
  ) => {
    const newAssignees = [...assignees];
    newAssignees[index] = { ...newAssignees[index], [field]: value };
    onAssigneesChange(newAssignees);
  };

  const getAssigneeDisplayText = () => {
    const validAssignees = assignees.filter((a) => a.userId > 0);
    if (validAssignees.length === 0) return null;

    return (
      <Flex align="center" className={styles.displayContainer}>
        <Avatar.Group size="small" max={{ count: 3 }}>
          {validAssignees.map((assignee, index) => {
            const user = users.find((u) => u.id === assignee.userId);
            return user ? (
              <Avatar key={index} src={user.avatar}>
                {user.name[0]}
              </Avatar>
            ) : null;
          })}
        </Avatar.Group>
        <Text type="secondary" className={styles.summaryText}>
          {validAssignees.length} assignee
          {validAssignees.length !== 1 ? 's' : ''} •{' '}
          {validAssignees.reduce((sum, a) => sum + a.estimatedHours, 0)}h total
        </Text>
      </Flex>
    );
  };

  const renderExpandedContent = () => (
    <Space direction="vertical" className={styles.expandedContent}>
      <Row justify="space-between" align="middle">
        <Col></Col>
        <Col>{getAssigneeDisplayText()}</Col>
      </Row>

      <Space direction="vertical" className={styles.assigneeList}>
        {assignees.map((assignee, index) => (
          <Card key={index} size="small" className={styles.assigneeCard}>
            <Row gutter={[12, 8]} align="middle">
              <Col span={12}>
                <Select
                  placeholder="Select user"
                  className={styles.userSelect}
                  value={assignee.userId || undefined}
                  onChange={(value) =>
                    handleAssigneeChange(index, 'userId', value)
                  }
                  disabled={disabled}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    String(option?.children || '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {users.map((user) => (
                    <Select.Option key={user.id} value={user.id}>
                      <Flex align="center" className={styles.userOption}>
                        <Avatar size="small" src={user.avatar}>
                          {user.name[0]}
                        </Avatar>
                        {user.name}
                      </Flex>
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={10}>
                <InputNumber
                  placeholder="Hours"
                  className={styles.hoursInput}
                  min={0}
                  max={999}
                  value={assignee.estimatedHours}
                  onChange={(value) =>
                    handleAssigneeChange(index, 'estimatedHours', value || 0)
                  }
                  disabled={disabled}
                  addonAfter="hrs"
                />
              </Col>
              <Col span={2}>
                {assignees.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveAssignee(index)}
                    disabled={disabled}
                    size="small"
                    className={styles.removeButton}
                  />
                )}
              </Col>
            </Row>
          </Card>
        ))}
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAddAssignee}
          disabled={disabled}
          className={styles.addButton}
        >
          Add Assignee
        </Button>
      </Space>
    </Space>
  );

  return {
    collapsed: getAssigneeDisplayText(),
    expanded: renderExpandedContent(),
  };
};

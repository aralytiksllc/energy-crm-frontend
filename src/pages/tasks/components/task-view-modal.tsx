import React from 'react';
import {
  Modal,
  Space,
  Typography,
  Divider,
  Popconfirm,
  InputNumber,
  Button,
  Row,
  Col,
  Tag,
} from 'antd';
import dayjs from 'dayjs';
import { useTasksKanbanStyles } from '../tasks-kanban.styles';

const { Text, Title } = Typography;

const STATUS_LABELS: Record<string, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

interface TaskViewModalProps {
  isVisible: boolean;
  selectedTask: any;
  canEdit: boolean;
  canDelete: boolean;
  actualHours: Record<string, number | null>;
  onClose: () => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onActualHoursChange: (assigneeId: string, value: number | null) => void;
  onSaveActualHours: (assigneeId: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'red';
    case 'High':
      return 'orange';
    case 'Medium':
      return 'blue';
    case 'Low':
      return 'green';
    default:
      return 'default';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'FEATURE':
      return 'green';
    case 'BUG':
      return 'red';
    case 'CODE_REVIEW':
      return 'blue';
    case 'DEPLOYMENT':
      return 'purple';
    default:
      return 'default';
  }
};

export const TaskViewModal: React.FC<TaskViewModalProps> = ({
  isVisible,
  selectedTask,
  canEdit,
  canDelete,
  actualHours,
  onClose,
  onEdit,
  onDelete,
  onActualHoursChange,
  onSaveActualHours,
}) => {
  const { styles } = useTasksKanbanStyles();

  if (!selectedTask) return null;

  return (
    <Modal
      title={
        <div className={styles.viewModalHeader}>
          <Space>
            <Title level={4} style={{ margin: 0 }}>
              {selectedTask?.title}
            </Title>
            <Tag color={getPriorityColor(selectedTask?.priority)}>
              {selectedTask?.priority || 'No Priority'}
            </Tag>
            <Tag color="default">
              {STATUS_LABELS[selectedTask?.status || 'todo']}
            </Tag>
          </Space>
          <Space className={styles.viewModalHeaderActions}>
            {canEdit && (
              <Button onClick={() => onEdit(selectedTask?.id)} type="default">
                Edit
              </Button>
            )}
            {canDelete && (
              <Popconfirm
                title="Are you sure you want to delete this task?"
                onConfirm={() => onDelete(selectedTask?.id)}
                okText="Yes"
                cancelText="No"
                placement="leftTop"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            )}
          </Space>
        </div>
      }
      open={isVisible}
      onCancel={onClose}
      width={700}
      destroyOnHidden
      footer={null}
      styles={{ body: { padding: 0 } }}
    >
      <div className={styles.viewModalBody}>
        <Row gutter={24} className={styles.modalRow}>
          <Col span={12}>
            <Space direction="vertical" size={8} className={styles.modalColumn}>
              <Text className={styles.modalSectionText}>Project</Text>
              <Space>
                <Tag color="blue">{selectedTask.project?.name}</Tag>
              </Space>
              <Text className={styles.modalSectionText}>Type</Text>
              <Space>
                <Tag color={getTypeColor(selectedTask.type)}>
                  {selectedTask.type}
                </Tag>
              </Space>
              <Text className={styles.modalSectionText}>Start Date</Text>
              <Space>
                <Tag color="default">
                  {selectedTask.startDate
                    ? dayjs(selectedTask.startDate).format('DD/MM/YYYY')
                    : 'Not set'}
                </Tag>
              </Space>
              <Text className={styles.modalSectionText}>Due Date</Text>
              <Space>
                <Tag color="default">
                  {selectedTask.dueDate
                    ? dayjs(selectedTask.dueDate).format('DD/MM/YYYY')
                    : 'Not set'}
                </Tag>
              </Space>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size={8} className={styles.modalColumn}>
              <Text className={styles.modalSectionText}>Status</Text>
              <Space>
                <Tag color={getPriorityColor(selectedTask?.priority)}>
                  {STATUS_LABELS[selectedTask?.status || 'todo']}
                </Tag>
              </Space>
              <Text className={styles.modalSectionText}>Priority</Text>
              <Space>
                <Tag color={getPriorityColor(selectedTask.priority)}>
                  {selectedTask.priority || 'No Priority'}
                </Tag>
              </Space>
            </Space>
          </Col>
        </Row>
        <Divider className={styles.modalDivider} />
        {selectedTask.description && (
          <div className={styles.descriptionContainer}>
            <Text strong>Description</Text>
            <div
              className={styles.descriptionContent}
              dangerouslySetInnerHTML={{ __html: selectedTask.description }}
            />
          </div>
        )}
        <Divider className={styles.modalDivider} />
        {selectedTask?.assignees && (
          <>
            <div className={styles.assigneeHeader}>
              <Title level={5} className={styles.assigneeTitle}>
                Assignees
              </Title>
              {selectedTask?.assignees && (
                <Text strong className={styles.assigneeHours}>
                  Total Estimated Hours:{' '}
                  {selectedTask.assignees.reduce(
                    (acc: number, assignee: any) =>
                      acc + (assignee.estimatedHours || 0),
                    0,
                  )}
                </Text>
              )}
            </div>
            <Row gutter={[0, 12]}>
              {selectedTask?.assignees?.map((assignee: any) => {
                const canEditHours =
                  selectedTask.status === 'done' ||
                  selectedTask.status === 'in-progress';

                return (
                  <Col span={24} key={assignee.id}>
                    <div className={styles.assigneeCard}>
                      <Space size={16} align="center">
                        <span className={styles.assigneeAvatar}>
                          {assignee.user.firstName?.[0]}
                          {assignee.user.lastName?.[0]}
                        </span>
                        <div className={styles.assigneeInfo}>
                          <Text>
                            {assignee.user.firstName} {assignee.user.lastName}
                          </Text>
                          <div className={styles.assigneeEmail}>
                            {assignee.user.email}
                          </div>
                        </div>
                      </Space>
                      <div className={styles.assigneeHoursContainer}>
                        <Tag color="green" className={styles.tagSmall}>
                          {assignee.estimatedHours}h est.
                        </Tag>

                        {assignee.actualHours && (
                          <Tag color="blue" className={styles.tagSmall}>
                            {assignee.actualHours}h actual
                          </Tag>
                        )}

                        {canEditHours && (
                          <Space>
                            <InputNumber
                              size="small"
                              value={actualHours[assignee.id]}
                              onChange={(value) =>
                                onActualHoursChange(assignee.id, value)
                              }
                              placeholder="Actual hours"
                              min={0}
                              step={0.5}
                              className={styles.actualHoursInput}
                            />
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => onSaveActualHours(assignee.id)}
                            >
                              Save
                            </Button>
                          </Space>
                        )}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    </Modal>
  );
};

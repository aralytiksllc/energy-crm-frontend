import React, { useMemo, useCallback, useState } from 'react';
import {
  useList,
  useUpdate,
  useDelete,
  useCreate,
  useCan,
  useGetIdentity,
} from '@refinedev/core';
import { useModalForm } from '@refinedev/antd';
import { KanbanBoard, KanbanBoardContainer } from './kanban/board';
import { KanbanCard } from './kanban/card';
import { KanbanColumn } from './kanban/column';
import { KanbanItem } from './kanban/item';
import { KanbanAddCardButton } from './components/kanban-add-card-button';
import { TaskForm } from './components/task-form';
import {
  Modal,
  message,
  Form,
  Tag,
  Space,
  Typography,
  Divider,
  Popconfirm,
  InputNumber,
  Button,
  Row,
  Col,
} from 'antd';
import dayjs from 'dayjs';
import { useTasksKanbanStyles } from './tasks-kanban.styles';
import { IUser } from '../../interfaces';

const { Text, Title } = Typography;

const STATUS_ORDER = ['todo', 'in_progress', 'review', 'done'];

const STATUS_LABELS: Record<string, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

export const Tasks: React.FC = () => {
  const { mutate: updateTask } = useUpdate();
  const { mutate: deleteTask } = useDelete();
  const { mutate: createTask } = useCreate();
  const { styles } = useTasksKanbanStyles();
  const { data: identity } = useGetIdentity<IUser>();
  const { mutate: updateAssignee } = useUpdate();

  const [form] = Form.useForm();

  // View card modal state
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [actualHours, setActualHours] = useState<Record<string, number | null>>(
    {},
  );

  const { data: canEdit } = useCan({
    resource: 'tasks',
    action: 'edit',
    params: { id: selectedTask?.id },
  });

  const { data: canDelete } = useCan({
    resource: 'tasks',
    action: 'delete',
    params: { id: selectedTask?.id },
  });

  const { data, isLoading, refetch } = useList({
    resource: 'tasks',
    pagination: { mode: 'off', pageSize: 1000 },
  });

  const tasks = data?.data || [];

  // Filter tasks based on user role
  const filteredTasks = useMemo(() => {
    if (identity?.role?.name === 'manager') {
      return tasks; // Managers see all tasks
    }

    if (!identity?.id) {
      return []; // No user logged in
    }

    // Regular users only see tasks they are assigned to
    return tasks.filter((task: any) =>
      task.assignees?.some(
        (assignee: any) => assignee.userId === Number(identity.id),
      ),
    );
  }, [tasks, identity?.id, identity?.role?.name]);

  // Group tasks by status - handle tasks without status field
  const sections = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      id: status,
      title: STATUS_LABELS[status],
      count: filteredTasks.filter(
        (task: any) => (task.status || 'todo') === status,
      ).length,
      tasks: filteredTasks.filter(
        (task: any) => (task.status || 'todo') === status,
      ),
    }));
  }, [filteredTasks]);

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (!active || !over || active.data.current?.status === over.id) return;

      const taskId = active.id;
      const newStatus = over.id;

      updateTask({
        resource: 'tasks',
        id: taskId,
        values: {
          status: newStatus,
        },
        mutationMode: 'optimistic',
        successNotification: {
          message: 'Task status updated successfully',
          type: 'success',
        },
        errorNotification: {
          message: 'Error updating task status',
          type: 'error',
        },
      });
    },
    [updateTask],
  );

  const createModalFormProps = useModalForm({
    resource: 'tasks',
    action: 'create',
    syncWithLocation: true,
  });

  const editModalFormProps = useModalForm({
    resource: 'tasks',
    action: 'edit',
    syncWithLocation: true,
  });
  const transformTaskValues = (values: any) => {
    const transformedValues = { ...values };
    if (Array.isArray(transformedValues.assignees)) {
      transformedValues.assignees = transformedValues.assignees
        .filter((a: any) => a && a.userId)
        .map((a: any) => ({
          userId: a.userId,
          estimatedHours: a.estimatedHours || 0,
        }));
    } else {
      transformedValues.assignees = [];
    }
    return transformedValues;
  };
  const createModalFormPropsFixed = {
    ...createModalFormProps,
    formProps: {
      ...createModalFormProps.formProps,
      onFinish: async (values: any) => {
        const transformed = transformTaskValues(values);
        if (createModalFormProps.formProps.onFinish) {
          const result =
            await createModalFormProps.formProps.onFinish(transformed);
          refetch();
          return result;
        }
      },
    },
  };
  const editModalFormPropsFixed = {
    ...editModalFormProps,
    formProps: {
      ...editModalFormProps.formProps,
      onFinish: async (values: any) => {
        const transformed = transformTaskValues(values);
        if (editModalFormProps.formProps.onFinish) {
          return editModalFormProps.formProps.onFinish(transformed);
        }
      },
    },
  };

  const handleAddCard = useCallback(
    (args: { id: string }) => {
      createModalFormProps.formProps.form?.setFieldsValue({ status: args.id });
      createModalFormProps.show();
    },
    [createModalFormProps],
  );

  const handleCardClick = useCallback((task: any) => {
    setSelectedTask(task);
    if (task && Array.isArray(task.assignees)) {
      const initialActualHours: Record<string, number | null> = {};
      task.assignees.forEach((assignee: any) => {
        initialActualHours[assignee.id] = assignee.actualHours ?? null;
      });
      setActualHours(initialActualHours);
    }
    setIsViewModalVisible(true);
  }, []);

  const handleEditCard = useCallback(
    (taskId: string) => {
      editModalFormProps.show(taskId);
      setIsViewModalVisible(false);
    },
    [editModalFormProps],
  );

  const handleDeleteCard = useCallback(
    (taskId: string) => {
      deleteTask({
        resource: 'tasks',
        id: taskId,
        successNotification: {
          message: 'Task deleted successfully',
          type: 'success',
        },
        errorNotification: {
          message: 'Error deleting task',
          type: 'error',
        },
      });
      // Close view modal if the deleted task was being viewed
      if (selectedTask?.id === taskId) {
        setIsViewModalVisible(false);
        setSelectedTask(null);
      }
    },
    [deleteTask, selectedTask],
  );

  const handleActualHoursChange = (
    assigneeId: string,
    value: number | null,
  ) => {
    setActualHours((prev) => ({ ...prev, [assigneeId]: value }));
  };

  const handleSaveActualHours = (assigneeId: string) => {
    const hours = actualHours[assigneeId];
    if (hours === null || hours === undefined) {
      message.error('Please enter a valid number for actual hours.');
      return;
    }

    updateAssignee(
      {
        resource: `tasks/${selectedTask.id}/assignee`,
        id: assigneeId,
        values: { actualHours: hours },
        successNotification: {
          message: 'Actual hours updated successfully!',
          type: 'success',
        },
        errorNotification: {
          message: 'Failed to update actual hours.',
          type: 'error',
        },
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

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

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className={styles.pageContainer}>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleDragEnd}>
          {sections.map((section) => (
            <KanbanColumn
              key={section.id}
              id={section.id}
              title={section.title}
              count={section.count}
              onAddClick={() => handleAddCard({ id: section.id })}
            >
              {section.tasks.map((task: any) => (
                <KanbanItem
                  key={task.id}
                  id={task.id}
                  data={{ ...task, status: task.status || 'todo' }}
                >
                  <KanbanCard
                    task={task}
                    onClick={() => handleCardClick(task)}
                    onDelete={
                      identity?.role?.name === 'manager'
                        ? () => handleDeleteCard(task.id)
                        : undefined
                    }
                  />
                </KanbanItem>
              ))}
              {section.tasks.length === 0 && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ id: section.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>

      <Modal {...createModalFormPropsFixed.modalProps}>
        <TaskForm formProps={createModalFormPropsFixed.formProps} />
      </Modal>

      <Modal {...editModalFormPropsFixed.modalProps}>
        <TaskForm formProps={editModalFormPropsFixed.formProps} />
      </Modal>

      {/* View Task Modal */}
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
              {canEdit?.can && (
                <Button
                  onClick={() => handleEditCard(selectedTask?.id)}
                  type="default"
                >
                  Edit
                </Button>
              )}
              {canDelete?.can && (
                <Popconfirm
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => handleDeleteCard(selectedTask?.id)}
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
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false);
          setSelectedTask(null);
        }}
        width={700}
        destroyOnHidden
        footer={null}
        styles={{ body: { padding: 0 } }}
      >
        {selectedTask && (
          <div className={styles.viewModalBody}>
            <Row gutter={24} className={styles.modalRow}>
              <Col span={12}>
                <Space
                  direction="vertical"
                  size={8}
                  className={styles.modalColumn}
                >
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
                  <Text className={styles.modalSectionText}>Due Date</Text>
                  <Space>
                    <Tag color="default">
                      {dayjs(selectedTask.dueDate).format('DD/MM/YYYY')}
                    </Tag>
                  </Space>
                </Space>
              </Col>
              <Col span={12}>
                <Space
                  direction="vertical"
                  size={8}
                  className={styles.modalColumn}
                >
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
            {(identity?.role?.name === 'manager' ||
              selectedTask?.assignees?.some(
                (assignee: any) => assignee.userId === Number(identity?.id),
              )) && (
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
                    const currentUserId = identity?.id;
                    const assigneeUserId = assignee.userId;
                    const isCurrentUser = currentUserId === assigneeUserId;
                    const canEditHours =
                      isCurrentUser &&
                      (selectedTask.status === 'done' ||
                        selectedTask.status === 'in-progress');

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
                                {assignee.user.firstName}{' '}
                                {assignee.user.lastName}
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
                                    handleActualHoursChange(assignee.id, value)
                                  }
                                  placeholder="Actual hours"
                                  min={0}
                                  step={0.5}
                                  className={styles.actualHoursInput}
                                />
                                <Button
                                  size="small"
                                  type="primary"
                                  onClick={() =>
                                    handleSaveActualHours(assignee.id)
                                  }
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
        )}
      </Modal>
    </div>
  );
};

const PageSkeleton = () => {
  const columnCount = 4;
  const itemCount = 3;
  const { styles } = useTasksKanbanStyles();

  return (
    <div className={styles.skeletonContainer}>
      <KanbanBoardContainer>
        {Array.from({ length: columnCount }).map((_, index) => (
          <KanbanColumn key={index} id={`skeleton-${index}`} title="" count={0}>
            {Array.from({ length: itemCount }).map((_, itemIndex) => (
              <div key={itemIndex} className={styles.skeletonCard} />
            ))}
          </KanbanColumn>
        ))}
      </KanbanBoardContainer>
    </div>
  );
};

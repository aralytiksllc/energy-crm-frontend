import React, { useMemo, useCallback, useState } from 'react';
import {
  useList,
  useUpdate,
  useNavigation,
  useDelete,
  useCreate,
} from '@refinedev/core';
import { useModalForm } from '@refinedev/antd';
import { KanbanBoard, KanbanBoardContainer } from './kanban/board';
import { KanbanCard } from './kanban/card';
import { KanbanColumn } from './kanban/column';
import { KanbanItem } from './kanban/item';
import { KanbanAddCardButton } from './components/kanban-add-card-button';
import { TaskForm } from './components/task-form';
import { useViewMode } from '@contexts/ViewModeContext';
import {
  Modal,
  message,
  Form,
  Descriptions,
  Tag,
  Space,
  Typography,
  Divider,
  Popconfirm,
} from 'antd';
import dayjs from 'dayjs';
import { useTasksKanbanStyles } from './tasks-kanban.styles';

const { Text, Title } = Typography;

const STATUS_ORDER = ['todo', 'in_progress', 'review', 'done'];

const STATUS_LABELS: Record<string, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

export const Tasks: React.FC = () => {
  const { viewMode } = useViewMode();
  const { replace } = useNavigation();
  const { mutate: updateTask } = useUpdate();
  const { mutate: deleteTask } = useDelete();
  const { mutate: createTask } = useCreate();
  const { styles } = useTasksKanbanStyles();

  const [form] = Form.useForm();

  // View card modal state
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const { data, isLoading, refetch } = useList({
    resource: 'tasks',
    pagination: { mode: 'off' },
    filters:
      viewMode === 'user'
        ? [
            {
              field: 'assignees.userId',
              operator: 'eq',
              value: 'current',
            },
          ]
        : [],
  });

  const tasks = data?.data || [];

  // Group tasks by status - handle tasks without status field
  const sections = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      id: status,
      title: STATUS_LABELS[status],
      count: tasks.filter((task: any) => (task.status || 'todo') === status)
        .length,
      tasks: tasks.filter((task: any) => (task.status || 'todo') === status),
    }));
  }, [tasks]);

  const handleDragEnd = useCallback(
    (event: any) => {
      if (viewMode !== 'manager') return;

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
    [viewMode, updateTask],
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

  const handleAddCard = useCallback(
    (args: { id: string }) => {
      createModalFormProps.formProps.form?.setFieldsValue({ status: args.id });
      createModalFormProps.show();
    },
    [createModalFormProps],
  );

  const handleCardClick = useCallback((task: any) => {
    setSelectedTask(task);
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
              onAddClick={viewMode === 'manager' ? handleAddCard : undefined}
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
                      viewMode === 'manager'
                        ? () => handleDeleteCard(task.id)
                        : undefined
                    }
                  />
                </KanbanItem>
              ))}
              {section.tasks.length === 0 && viewMode === 'manager' && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ id: section.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>

      <Modal {...createModalFormProps.modalProps}>
        <TaskForm formProps={createModalFormProps.formProps} />
      </Modal>

      <Modal {...editModalFormProps.modalProps}>
        <TaskForm formProps={editModalFormProps.formProps} />
      </Modal>

      {/* View Task Modal */}
      <Modal
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>
              {selectedTask?.title}
            </Title>
            <Tag color={getPriorityColor(selectedTask?.priority)}>
              {selectedTask?.priority || 'No Priority'}
            </Tag>
          </Space>
        }
        open={isViewModalVisible}
        onCancel={() => {
          setIsViewModalVisible(false);
          setSelectedTask(null);
        }}
        width={800}
        destroyOnClose
        footer={[
          <Space key="footer" className={styles.viewModalFooter}>
            <div>
              {viewMode === 'manager' && (
                <>
                  <Tag
                    color="blue"
                    className={styles.editTag}
                    onClick={() => handleEditCard(selectedTask?.id)}
                  >
                    Edit Task
                  </Tag>
                  <Popconfirm
                    title="Are you sure you want to delete this task?"
                    onConfirm={() => handleDeleteCard(selectedTask?.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag color="red" className={styles.deleteTag}>
                      Delete Task
                    </Tag>
                  </Popconfirm>
                </>
              )}
            </div>
            <div>
              <Tag color="default">
                Status: {STATUS_LABELS[selectedTask?.status || 'todo']}
              </Tag>
            </div>
          </Space>,
        ]}
      >
        {selectedTask && (
          <div>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Project">
                <Tag color="blue">{selectedTask.project?.name}</Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Type">
                <Tag color={getTypeColor(selectedTask.type)}>
                  {selectedTask.type}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Priority">
                <Tag color={getPriorityColor(selectedTask.priority)}>
                  {selectedTask.priority || 'No Priority'}
                </Tag>
              </Descriptions.Item>

              {selectedTask.dueDate && (
                <Descriptions.Item label="Due Date">
                  <Text>
                    {dayjs(selectedTask.dueDate).format('DD/MM/YYYY')}
                  </Text>
                </Descriptions.Item>
              )}

              {selectedTask.description && (
                <Descriptions.Item label="Description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedTask.description,
                    }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>

            <Divider />

            <Title level={5}>Assignees</Title>
            {selectedTask.assignees?.length > 0 ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                {selectedTask.assignees.map((assignee: any) => (
                  <div
                    key={assignee.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text>
                      {assignee.user.firstName} {assignee.user.lastName}
                    </Text>
                    <Space>
                      <Tag color="green">
                        {assignee.estimatedHours}h estimated
                      </Tag>
                      {assignee.actualHours && (
                        <Tag color="blue">{assignee.actualHours}h actual</Tag>
                      )}
                    </Space>
                  </div>
                ))}
              </Space>
            ) : (
              <Text type="secondary">No assignees</Text>
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
          <KanbanColumn
            key={index}
            id={`skeleton-${index}`}
            title="Loading..."
            count={0}
          >
            {Array.from({ length: itemCount }).map((_, itemIndex) => (
              <div key={itemIndex} className={styles.skeletonCard} />
            ))}
          </KanbanColumn>
        ))}
      </KanbanBoardContainer>
    </div>
  );
};

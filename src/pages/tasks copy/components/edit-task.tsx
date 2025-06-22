import React from 'react';
import {
  Form,
  Button,
  message,
  Card,
  Flex,
  Avatar,
  Typography,
  Space,
  Tooltip,
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { TaskType } from '@/components/task-form/task-form.types';
import { useEditTask } from '../hooks/useEditTask';
import { useUsers } from '@/pages/users/hooks/useUsers';
import { useEditTaskStyles } from './edit-task.styles';
import { useAssigneeSection } from './assignee-section';
import type { EditTaskProps } from '../types';
import type {
  TaskFormValues,
  TaskAssignee,
  TaskFormTab,
} from '@/components/task-form/task-form.types';
import { TaskForm, TaskCommentsSection } from '@/components';

const { Text } = Typography;

export const EditTask: React.FC<EditTaskProps> = ({
  taskId,
  initialData,
  onSuccess,
  onCancel,
  onError,
  showActions = false,
  disabled = false,
  loading: externalLoading = false,
  showUserSelection = true,
  autoSubmit = false,
}) => {
  const [form] = Form.useForm<TaskFormValues>();
  const { mutate: editTask, isLoading: editLoading } = useEditTask();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>(
    initialData?.assignedTo || [],
  );
  const [assignees, setAssignees] = React.useState<TaskAssignee[]>(() => {
    if (initialData?.assignees?.length) {
      return initialData.assignees;
    }
    return [{ userId: 0, estimatedHours: 0 }];
  });
  const [activeTab, setActiveTab] = React.useState<TaskFormTab>('overview');
  const { styles } = useEditTaskStyles();

  // Transform users to match the expected User interface
  const transformedUsers = React.useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar || undefined,
    }));
  }, [users]);

  const loading = externalLoading || editLoading;

  const assigneeSection = useAssigneeSection({
    assignees,
    users: transformedUsers,
    disabled,
    onAssigneesChange: setAssignees,
  });

  const getAssigneeDisplay = () => {
    const validAssignees = assignees.filter((a) => a.userId > 0);
    if (validAssignees.length === 0) return null;

    const totalHours = validAssignees.reduce(
      (sum, a) => sum + a.estimatedHours,
      0,
    );

    return (
      <Space align="center" className={styles.assigneeDisplay}>
        <Avatar.Group size="small" max={{ count: 3 }}>
          {validAssignees.map((assignee, index) => {
            const user = transformedUsers.find((u) => u.id === assignee.userId);
            return user ? (
              <Tooltip key={index} title={user.name}>
                <Avatar src={user.avatar}>{user.name[0]}</Avatar>
              </Tooltip>
            ) : null;
          })}
        </Avatar.Group>
        <Space direction="vertical" size={0} className={styles.assigneeSummary}>
          <Text className={styles.assigneeCount}>
            {validAssignees.length} assignee
            {validAssignees.length !== 1 ? 's' : ''}
          </Text>
          <Text type="secondary" className={styles.totalHours}>
            <ClockCircleOutlined /> {totalHours}h total
          </Text>
        </Space>
      </Space>
    );
  };

  const handleSubmit = React.useCallback(
    async (values?: TaskFormValues) => {
      try {
        const formValues = values || (await form.validateFields());

        const validAssignees = assignees.filter((a) => a.userId > 0);
        const assignedUserIds = validAssignees.map((a) => a.userId);

        if (validAssignees.length === 0) {
          throw new Error('Please assign at least one user to the task');
        }

        // Transform form data to match backend UpdateTaskDto
        const updateTaskData = {
          title: formValues.title,
          description: formValues.description,
          type: formValues.type || TaskType.OTHER,
          priority: formValues.priority,
          dueDate: formValues.dueDate
            ? new Date(formValues.dueDate).toISOString()
            : undefined,
          assignedToIds: assignedUserIds,
          assignees: validAssignees.map((assignee) => ({
            userId: assignee.userId,
            estimatedHours: assignee.estimatedHours,
          })),
        };

        await editTask({
          id: taskId,
          ...updateTaskData,
        });

        if (onSuccess) {
          onSuccess(formValues);
        } else {
          message.success('Task updated successfully');
        }
      } catch (error) {
        const err = error as Error;
        if (onError) {
          onError(err);
        } else {
          message.error(`Failed to update task: ${err.message}`);
        }
      }
    },
    [form, editTask, taskId, assignees, onSuccess, onError],
  );

  const handleUserSelect = React.useCallback((userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  }, []);

  const handleReset = React.useCallback(() => {
    form.resetFields();
    setSelectedUsers(initialData?.assignedTo || []);
    setAssignees(initialData?.assignees || [{ userId: 0, estimatedHours: 0 }]);
    setActiveTab('overview');
    if (onCancel) {
      onCancel();
    }
  }, [form, initialData, onCancel]);

  const handleFinish = React.useCallback(
    (values: TaskFormValues) => {
      if (autoSubmit) {
        handleSubmit(values);
      }
    },
    [autoSubmit, handleSubmit],
  );

  return (
    <Card className={styles.editTaskCard}>
      <TaskForm
        form={form}
        onFinish={handleFinish}
        disabled={disabled}
        loading={loading}
        users={transformedUsers}
        selectedUsers={selectedUsers}
        onUserSelect={handleUserSelect}
        showUserSelection={showUserSelection}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        initialValues={initialData}
        renderAssigneeSection={
          activeTab === 'overview' ? getAssigneeDisplay : undefined
        }
        renderCommentsSection={() => (
          <TaskCommentsSection
            taskId={taskId?.toString()}
            disabled={disabled}
            loading={loading}
          />
        )}
        taskId={taskId?.toString()}
      />

      {activeTab === 'overview' && showUserSelection && (
        <Form.Item
          name="assignees"
          label="Assignees"
          rules={[
            { required: true, message: 'At least one assignee is required' },
            {
              validator: (_, value) => {
                if (!value || !Array.isArray(value)) {
                  return Promise.reject(
                    new Error('At least one assignee is required'),
                  );
                }
                const validAssignees = value.filter(
                  (assignee) => assignee?.userId > 0,
                );
                if (validAssignees.length === 0) {
                  return Promise.reject(
                    new Error('At least one assignee is required'),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          className={styles.assigneeFormSection}
        >
          <div>{assigneeSection.expanded}</div>
        </Form.Item>
      )}

      {showActions && (
        <Card size="small" className={styles.actionsCard}>
          <Flex justify="flex-end" className={styles.actionsContainer}>
            <Button
              icon={<CloseOutlined />}
              onClick={handleReset}
              disabled={loading}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleSubmit()}
              loading={loading}
              className={styles.updateButton}
            >
              Update
            </Button>
          </Flex>
        </Card>
      )}
    </Card>
  );
};

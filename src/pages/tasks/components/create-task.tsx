import React from 'react';
import { Card, Form, Avatar, Tooltip, Space, Typography, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useCreateTask } from '../hooks/useCreateTask';
import { useCreateTaskStyles } from './create-task.styles';
import { useAssigneeSection } from './assignee-section';
import { MOCK_USERS } from '../constants/taskConstants';
import { TaskType } from '@/components/task-form/task-form.types';
import type { CreateTaskProps } from '../types';
import type {
  TaskFormValues,
  TaskAssignee,
  TaskFormTab,
} from '@/components/task-form/task-form.types';
import { TaskForm } from '@/components';

const { Text } = Typography;

export const CreateTask: React.FC<CreateTaskProps> = ({
  stageId,
  projectId,
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
  const { mutate: createTask, isLoading: createLoading } = useCreateTask();
  const [assignees, setAssignees] = React.useState<TaskAssignee[]>([
    { userId: 0, estimatedHours: 0 },
  ]);
  const [activeTab, setActiveTab] = React.useState<TaskFormTab>('overview');
  const { styles } = useCreateTaskStyles();

  const loading = externalLoading || createLoading;

  // Mock current user - in a real app, this would come from auth context
  const currentUser = {
    id: 1,
    name: 'Current User',
    avatar: undefined,
  };

  const assigneeSection = useAssigneeSection({
    assignees,
    users: MOCK_USERS,
    disabled,
    onAssigneesChange: (newAssignees) => {
      setAssignees(newAssignees);
      form.setFieldValue('assignees', newAssignees);
    },
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
            const user = MOCK_USERS.find((u) => u.id === assignee.userId);
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

        await createTask({
          ...formValues,
          stageId,
          projectId,
          assignedTo: assignedUserIds,
          type: formValues.type || TaskType.TASK,
        });

        form.resetFields();
        setAssignees([{ userId: 0, estimatedHours: 0 }]);

        if (onSuccess) {
          onSuccess(formValues);
        } else {
          message.success('Task created successfully');
        }
      } catch (error) {
        const err = error as Error;
        if (onError) {
          onError(err);
        } else {
          message.error(`Failed to create task: ${err.message}`);
        }
      }
    },
    [form, createTask, stageId, projectId, assignees, onSuccess, onError],
  );

  const handleReset = React.useCallback(() => {
    form.resetFields();
    setAssignees([{ userId: 0, estimatedHours: 0 }]);
    setActiveTab('overview');
    if (onCancel) {
      onCancel();
    }
  }, [form, onCancel]);

  const handleFinish = React.useCallback(
    (values: TaskFormValues) => {
      if (autoSubmit) {
        handleSubmit(values);
      }
    },
    [autoSubmit, handleSubmit],
  );

  return (
    <Card className={styles.createTaskCard}>
      <TaskForm
        form={form}
        onFinish={handleFinish}
        disabled={disabled}
        loading={loading}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        initialValues={{
          type: TaskType.TASK,
        }}
        showActions={showActions}
        onSave={() => handleSubmit()}
        onCancel={handleReset}
        renderAssigneeSection={() =>
          activeTab === 'overview' && showUserSelection ? (
            <div className={styles.assigneeFormSection}>
              {assigneeSection.expanded}
            </div>
          ) : null
        }
        renderCommentsSection={() => (
          <div className={styles.emptyCommentsSection}>
            <Text type="secondary">
              Comments will be available after the task is created.
            </Text>
          </div>
        )}
        currentUser={currentUser}
      />
    </Card>
  );
};

import React from 'react';
import { Card, Form, Avatar, Tooltip, Space, Typography, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useCreateTask } from '../hooks/useCreateTask';
import { useCreateTaskStyles } from './create-task.styles';
import { useAssigneeSection } from './assignee-section';
import { TaskType } from '@/components/task-form/task-form.types';
import { useProjects } from '@/pages/projects/hooks/useProjects';
import { useUsers } from '@/pages/users/hooks/useUsers';
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
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const [assignees, setAssignees] = React.useState<TaskAssignee[]>([
    { userId: 0, estimatedHours: 0 },
  ]);
  const [activeTab, setActiveTab] = React.useState<TaskFormTab>('overview');
  const { styles } = useCreateTaskStyles();

  // Ensure projects is always an array
  const safeProjects = React.useMemo(() => {
    return Array.isArray(projects) ? projects : [];
  }, [projects]);

  // Transform users to match the expected User interface
  const transformedUsers = React.useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar || undefined,
    }));
  }, [users]);

  const loading = externalLoading || createLoading;

  const assigneeSection = useAssigneeSection({
    assignees,
    users: transformedUsers,
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

        // Transform form data to match backend CreateTaskDto
        const selectedProjectId = formValues.projectId || projectId;

        if (!selectedProjectId) {
          throw new Error('Please select a project');
        }

        if (validAssignees.length === 0) {
          throw new Error('Please assign at least one user to the task');
        }

        const createTaskData = {
          title: formValues.title,
          description: formValues.description,
          type: formValues.type || TaskType.OTHER,
          priority: formValues.priority,
          dueDate: formValues.dueDate
            ? new Date(formValues.dueDate).toISOString()
            : undefined,
          isCompleted: false, // New tasks are not completed by default
          projectId: selectedProjectId,
          assignees: validAssignees.map((assignee) => ({
            userId: assignee.userId,
            estimatedHours: assignee.estimatedHours,
          })),
        };

        await createTask(createTaskData);

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
    [form, createTask, projectId, assignees, onSuccess, onError],
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
          type: TaskType.OTHER,
          projectId: projectId,
        }}
        showActions={showActions}
        onSave={() => handleSubmit()}
        onCancel={handleReset}
        projects={safeProjects}
        projectsLoading={projectsLoading}
        showProjectSelection={true}
        renderAssigneeSection={() =>
          activeTab === 'overview' && showUserSelection ? (
            <Form.Item
              name="assignees"
              label="Assignees"
              rules={[
                {
                  required: true,
                  message: 'At least one assignee is required',
                },
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
          ) : null
        }
        renderCommentsSection={() => (
          <div className={styles.emptyCommentsSection}>
            <Text type="secondary">
              Comments will be available after the task is created.
            </Text>
          </div>
        )}
      />
    </Card>
  );
};

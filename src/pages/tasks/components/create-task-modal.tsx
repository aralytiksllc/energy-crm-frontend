import React from 'react';
import { Modal, Form, Input, DatePicker, Avatar, Tooltip, Space } from 'antd';
import { useCreateTask } from '../hooks/useCreateTask';
import { rules } from '../constants/validation';
import { createStyles } from 'antd-style';
import { TaskType } from '../types';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  stageId: string;
  projectId: number;
}

interface FormValues {
  title: string;
  description?: string;
  dueDate?: Date;
}

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3',
  },
  {
    id: 4,
    name: 'Alice Brown',
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
  },
];

const useModalStyles = createStyles(({ css }) => ({
  avatarSelected: css`
    border: 2px solid var(--color-avatar-blue) !important;
  `,
  selectedCount: css`
    font-size: 12px;
    color: var(--color-text-secondary);
    margin-top: 4px;
    margin-left: 2px;
  `,
  avatarGroup: css`
    margin-top: 2px;
  `,
}));

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  open,
  onClose,
  stageId,
  projectId,
}) => {
  const [form] = Form.useForm<FormValues>();
  const { mutate: createTask, isLoading } = useCreateTask();
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);
  const { styles } = useModalStyles();

  const handleSubmit = async (values: FormValues) => {
    try {
      await createTask({
        ...values,
        stageId,
        projectId,
        assignedTo: selectedUsers,
        type: TaskType.TASK,
      });
      form.resetFields();
      setSelectedUsers([]);
      onClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <Modal
      title="Create New Task"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={rules.title}>
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Assigned To">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Avatar.Group
              className={styles.avatarGroup}
              max={{
                count: 2,
                style: {
                  color: 'var(--color-avatar-orange)',
                  backgroundColor: 'var(--color-avatar-orange-bg)',
                  cursor: 'pointer',
                },
                popover: { trigger: 'click' },
              }}
            >
              {mockUsers.map((user) => (
                <Tooltip key={user.id} title={user.name} placement="top">
                  <Avatar
                    src={user.avatar}
                    className={
                      selectedUsers.includes(user.id)
                        ? styles.avatarSelected
                        : ''
                    }
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleUserSelect(user.id)}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
            {selectedUsers.length > 0 && (
              <span className={styles.selectedCount}>
                Selected: {selectedUsers.length} user
                {selectedUsers.length !== 1 ? 's' : ''}
              </span>
            )}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

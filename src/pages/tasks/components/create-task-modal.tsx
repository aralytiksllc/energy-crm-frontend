import React from 'react';
import { Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateTask } from './create-task';
import type { TaskFormValues } from '@/components/task-form/task-form.types';

interface CreateTaskModalProps {
  stageId: string;
  projectId: number;
  onTaskCreated?: (values: TaskFormValues) => void;
  buttonStyle?: React.CSSProperties;
  disabled?: boolean;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  stageId,
  projectId,
  onTaskCreated,
  buttonStyle,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSuccess = React.useCallback(
    (values: TaskFormValues) => {
      setIsModalOpen(false);
      if (onTaskCreated) {
        onTaskCreated(values);
      }
    },
    [onTaskCreated],
  );

  const handleCancel = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Button
        type="text"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={buttonStyle}
        disabled={disabled}
        aria-label="Create new task"
      />

      <Modal
        title="Create New Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        destroyOnClose
        styles={{
          header: {
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: '16px',
            marginBottom: '24px',
          },
          body: {
            padding: '5px',
          },
        }}
      >
        <CreateTask
          stageId={stageId}
          projectId={projectId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          showActions={true}
          showUserSelection={true}
        />
      </Modal>
    </>
  );
};

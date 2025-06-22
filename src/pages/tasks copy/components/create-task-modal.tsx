import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { GenericModal } from '@/components';
import { CreateTask } from './create-task';
import type { TaskFormValues } from '@/components/task-form/task-form.types';

interface CreateTaskModalProps {
  stageId: string;
  projectId?: number;
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
    <GenericModal
      title="Create New Task"
      open={isModalOpen}
      onCancel={handleCancel}
      buttonText=""
      buttonIcon={<PlusOutlined />}
      buttonType="text"
      buttonStyle={buttonStyle}
      buttonDisabled={disabled}
      onButtonClick={() => setIsModalOpen(true)}
      showFooter={false}
      width={600}
    >
      <CreateTask
        stageId={stageId}
        projectId={projectId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        showActions={true}
        showUserSelection={true}
      />
    </GenericModal>
  );
};

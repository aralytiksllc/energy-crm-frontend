import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EditProjectModal } from './edit-project-modal';

interface EditProjectButtonProps {
  projectId: number;
  onProjectUpdated?: () => void;
  size?: 'small' | 'middle' | 'large';
  hideText?: boolean;
}

export const EditProjectButton: React.FC<EditProjectButtonProps> = ({
  projectId,
  onProjectUpdated,
  size = 'small',
  hideText = true,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    if (onProjectUpdated) {
      onProjectUpdated();
    }
  };

  return (
    <>
      <Button
        type="primary"
        ghost
        icon={<EditOutlined />}
        size={size}
        onClick={() => setIsModalOpen(true)}
      >
        {!hideText && 'Edit'}
      </Button>

      <EditProjectModal
        projectId={projectId}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectUpdated={handleSuccess}
      />
    </>
  );
};

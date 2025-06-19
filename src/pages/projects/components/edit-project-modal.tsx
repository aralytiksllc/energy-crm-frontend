import React from 'react';
import { Space } from 'antd';
import {
  FolderOutlined,
  UserOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { GenericModal, GenericModalTab } from '@/components';
import { ProjectBasicForm } from './project-basic-form';
import { IProject, UpdateProjectDto } from '../types/types';
import {
  transformToUpdateDto,
  transformFromBackend,
} from '../utils/project-transformer';

interface EditProjectModalProps {
  projectId: number;
  open: boolean;
  onClose: () => void;
  onProjectUpdated?: (project: IProject) => void;
}

type ProjectFormTab = 'overview' | 'members' | 'notes' | 'documents';

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  projectId,
  open,
  onClose,
  onProjectUpdated,
}) => {
  const [activeTab, setActiveTab] = React.useState<ProjectFormTab>('overview');

  const { formProps, formLoading, onFinish, queryResult } = useForm<
    IProject,
    HttpError,
    UpdateProjectDto
  >({
    resource: 'projects',
    action: 'edit',
    id: projectId,
    onMutationSuccess: (data) => {
      handleSuccess(data.data as IProject);
    },
    onMutationError: (error) => {
      console.error('Error updating project:', error);
    },
  });

  const handleSuccess = React.useCallback(
    (project: IProject) => {
      onClose();
      setActiveTab('overview');
      if (onProjectUpdated) {
        onProjectUpdated(project);
      }
    },
    [onClose, onProjectUpdated],
  );

  const handleCancel = React.useCallback(() => {
    onClose();
    setActiveTab('overview');
  }, [onClose]);

  const handleFinish = async (values: any) => {
    try {
      // Transform form data to backend DTO format
      const updateDto = transformToUpdateDto(values);
      await onFinish(updateDto);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  // Transform backend data for form display
  React.useEffect(() => {
    if (queryResult?.data?.data && formProps.form) {
      const transformedData = transformFromBackend(
        queryResult.data.data as IProject,
      );
      formProps.form.setFieldsValue(transformedData);
    }
  }, [queryResult?.data, formProps.form]);

  const tabs: GenericModalTab[] = [
    {
      label: (
        <Space>
          <FolderOutlined />
          Overview
        </Space>
      ),
      value: 'overview',
    },
    {
      label: (
        <Space>
          <UserOutlined />
          Members
        </Space>
      ),
      value: 'members',
    },
    {
      label: (
        <Space>
          <FileTextOutlined />
          Notes
        </Space>
      ),
      value: 'notes',
    },
    {
      label: (
        <Space>
          <FolderOpenOutlined />
          Documents
        </Space>
      ),
      value: 'documents',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectBasicForm />;
      case 'members':
        return (
          <div style={{ padding: '24px', textAlign: 'center', color: '#999' }}>
            Members management will be implemented soon...
          </div>
        );
      case 'notes':
        return (
          <div style={{ padding: '24px', textAlign: 'center', color: '#999' }}>
            Notes management will be implemented soon...
          </div>
        );
      case 'documents':
        return (
          <div style={{ padding: '24px', textAlign: 'center', color: '#999' }}>
            Documents management will be implemented soon...
          </div>
        );
      default:
        return null;
    }
  };

  const projectData = queryResult?.data?.data as IProject;

  return (
    <GenericModal
      title={`Edit Project: ${projectData?.name || 'Loading...'}`}
      open={open}
      onCancel={handleCancel}
      loading={formLoading || queryResult?.isLoading}
      buttonText="Update Project"
      showTabs={true}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as ProjectFormTab)}
      form={formProps.form}
      onFinish={handleFinish}
      width={600}
      showButton={false}
    >
      {renderTabContent()}
    </GenericModal>
  );
};

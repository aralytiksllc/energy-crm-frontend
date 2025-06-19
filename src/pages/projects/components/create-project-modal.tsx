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
import {
  IProject,
  CreateProjectDto,
  ProjectStatus,
  ProjectPriority,
} from '../types/types';
import { transformToCreateDto } from '../utils/project-transformer';

interface CreateProjectModalProps {
  onProjectCreated?: (values: IProject) => void;
  buttonStyle?: React.CSSProperties;
  disabled?: boolean;
}

type ProjectFormTab = 'overview' | 'members' | 'notes' | 'documents';

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onProjectCreated,
  buttonStyle,
  disabled = false,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<ProjectFormTab>('overview');

  const { formProps, saveButtonProps, formLoading, onFinish } = useForm<
    IProject,
    HttpError,
    CreateProjectDto
  >({
    resource: 'projects',
    action: 'create',
    onMutationSuccess: (data) => {
      handleSuccess(data.data as IProject);
    },
    onMutationError: (error) => {
      console.error('Error creating project:', error);
    },
  });

  const handleSuccess = React.useCallback(
    (project: IProject) => {
      setIsModalOpen(false);
      setActiveTab('overview');
      if (onProjectCreated) {
        onProjectCreated(project);
      }
    },
    [onProjectCreated],
  );

  const handleCancel = React.useCallback(() => {
    setIsModalOpen(false);
    setActiveTab('overview');
    formProps.form?.resetFields();
  }, [formProps.form]);

  const handleOpenModal = React.useCallback(() => {
    setIsModalOpen(true);
    setTimeout(() => {
      formProps.form?.resetFields();
      formProps.form?.setFieldsValue({
        status: ProjectStatus.NotStarted,
        priority: ProjectPriority.Medium,
        budget: 0,
        progress: 0,
        isArchived: false,
        isPrivate: false,
        tags: [],
        technologies: [],
      });
    }, 0);
  }, [formProps.form]);

  const handleFinish = async (values: any) => {
    try {
      // Transform form data to backend DTO format
      const createDto = transformToCreateDto(values);
      await onFinish(createDto);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

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

  return (
    <GenericModal
      title="Create New Project"
      open={isModalOpen}
      onCancel={handleCancel}
      loading={formLoading}
      buttonText="Create Project"
      buttonStyle={buttonStyle}
      buttonDisabled={disabled}
      onButtonClick={handleOpenModal}
      showTabs={true}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as ProjectFormTab)}
      form={formProps.form}
      onFinish={handleFinish}
      width={600}
    >
      {renderTabContent()}
    </GenericModal>
  );
};

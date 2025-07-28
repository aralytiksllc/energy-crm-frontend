import React, { useState } from 'react';
import { Form, FormProps } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  PaperClipOutlined,
  FileTextOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { GenericTabs, GenericTabItem } from '@components/generic-tabs';
import { ProjectOverviewForm } from './project-overview-form';
import { ProjectMembersForm } from './project-members-form';
import { ProjectAttachmentsForm } from './project-attachments-form';
import { ProjectPagesForm } from './project-pages-form';
import { ProjectCommentsForm } from './project-comments-form';
import { IUser } from '@interfaces/users';

export interface ProjectFormProps {
  formProps: FormProps;
  users?: IUser[];
  usersLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = (props) => {
  const { formProps, users, usersLoading } = props;
  const [activeTab, setActiveTab] = useState<string>('overview');

  const tabs: GenericTabItem[] = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <FileOutlined />,
      children: <ProjectOverviewForm formProps={formProps} />,
    },
    {
      key: 'members',
      label: 'Members',
      icon: <TeamOutlined />,
      children: (
        <ProjectMembersForm
          formProps={formProps}
          users={users}
          usersLoading={usersLoading}
        />
      ),
    },
    {
      key: 'attachments',
      label: 'Attachments',
      icon: <PaperClipOutlined />,
      children: <ProjectAttachmentsForm formProps={formProps} />,
    },
    {
      key: 'pages',
      label: 'Pages',
      icon: <FileTextOutlined />,
      children: <ProjectPagesForm formProps={formProps} />,
    },
    {
      key: 'comments',
      label: 'Comments',
      icon: <CommentOutlined />,
      children: <ProjectCommentsForm formProps={formProps} />,
    },
  ];

  return (
    <Form layout="vertical" {...formProps}>
      <GenericTabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </Form>
  );
};

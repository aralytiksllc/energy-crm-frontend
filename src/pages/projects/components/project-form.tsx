import React, { useState } from 'react';
import { Form, FormProps } from 'antd';
import { DrawerTabs, DrawerTabItem } from '@/components/drawer-tabs';
import { ProjectOverviewForm } from './project-overview-form';
import { ProjectMembersForm } from './project-members-form';

export interface ProjectFormProps {
  formProps: FormProps;
}

export const ProjectForm: React.FC<ProjectFormProps> = (props) => {
  const { formProps } = props;
  const [activeTab, setActiveTab] = useState<string>('overview');

  const tabs: DrawerTabItem[] = [
    {
      key: 'overview',
      label: 'Overview',
      children: <ProjectOverviewForm formProps={formProps} />,
    },
    {
      key: 'members',
      label: 'Members',
      children: <ProjectMembersForm formProps={formProps} />,
    },
  ];

  return (
    <Form layout="vertical" {...formProps}>
      <DrawerTabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
    </Form>
  );
};

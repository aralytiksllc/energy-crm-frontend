import * as React from 'react';
import { Create, useForm } from '@refinedev/antd';
import { ProjectsForm } from '../components/ProjectsForm';
import { IProject } from '../types/types';
import type { FormProps } from 'antd/es/form';

export const ProjectsCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IProject>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ProjectsForm formProps={formProps as unknown as FormProps<IProject>} />
    </Create>
  );
};

export default ProjectsCreate;

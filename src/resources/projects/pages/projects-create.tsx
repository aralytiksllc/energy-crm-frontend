import * as React from 'react';
import { Create, useForm } from '@refinedev/antd';
import { ProjectsForm } from '../components/ProjectsForm';
import { IProject } from '../types/types';

export const ProjectsCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IProject>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <ProjectsForm formProps={formProps} />
    </Create>
  );
};

export default ProjectsCreate;

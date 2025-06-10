import * as React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { ProjectsForm } from '../components/ProjectsForm';
import { IProject } from '../types/types';

export const ProjectsEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IProject>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <ProjectsForm formProps={formProps} />
    </Edit>
  );
};

export default ProjectsEdit;

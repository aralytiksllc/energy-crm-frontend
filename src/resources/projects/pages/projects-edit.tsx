import * as React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { ProjectsForm } from '../components/ProjectsForm';
import { IProject } from '../types/types';
import type { FormProps } from 'antd/es/form';

export const ProjectsEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IProject>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <ProjectsForm formProps={formProps as unknown as FormProps<IProject>} />
    </Edit>
  );
};

export default ProjectsEdit;

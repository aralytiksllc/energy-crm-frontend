import * as React from 'react';
import { Modal } from 'antd';
import { useModalForm } from '@refinedev/antd';

import { ProjectForm } from './components/project-form';

interface ModalFormProps {}

export const ProjectsEdit: React.FC<ModalFormProps> = () => {
  const { modalProps, formProps, redirect } = useModalForm({
    action: 'edit',
    resource: 'projects',
    redirect: false,
    defaultVisible: true,
  });

  const redirectToList = React.useCallback(() => redirect('list'), [redirect]);

  return (
    <Modal {...modalProps} afterClose={redirectToList}>
      <ProjectForm formProps={formProps} />
    </Modal>
  );
};

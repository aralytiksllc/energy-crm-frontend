import * as React from 'react';
import { Modal } from 'antd';
import { useModalForm } from '@refinedev/antd';

interface ModalFormProps {
  children: React.ReactNode;
}

export const ModalForm: React.FC<ModalFormProps> = ({ children }) => {
  const { modalProps, redirect } = useModalForm({
    action: 'create',
    resource: 'tasks',
    redirect: false,
    defaultVisible: true,
  });

  const handleAfterClose = React.useCallback(
    () => redirect('list'),
    [redirect],
  );

  return (
    <Modal {...modalProps} afterClose={handleAfterClose}>
      {children}
    </Modal>
  );
};

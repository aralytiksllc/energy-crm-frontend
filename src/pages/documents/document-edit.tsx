// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IDocument } from '@/interfaces/documents';
import { Edit } from '@/components/edit';
import { DocumentForm } from './components/document-form';
import { useParams } from 'react-router';

export type DocumentEditProps = {};

export const DocumentEdit: React.FC<DocumentEditProps> = () => {
  const { customerId } = useParams();

  const { formLoading, formProps, saveButtonProps } = useForm<
    IDocument,
    HttpError,
    IDocument
  >({
    resource: 'documents',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit Document"
      resource="documents"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <DocumentForm formProps={formProps} />
    </Edit>
  );
};

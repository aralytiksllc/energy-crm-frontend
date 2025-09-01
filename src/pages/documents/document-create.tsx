// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IDocument } from '@/interfaces/documents';
import { Create } from '@/components/create';
import { DocumentForm } from './components/document-form';

export type DocumentCreateProps = {};

export const DocumentCreate: React.FC<DocumentCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IDocument,
    HttpError,
    IDocument
  >({
    resource: 'documents',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create Document"
      resource="documents"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <DocumentForm formProps={formProps} />
    </Create>
  );
};

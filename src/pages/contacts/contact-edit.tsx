// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IContact } from '@/interfaces/contacts';
import { Edit } from '@/components/edit';
import { ContactForm } from './components/contact-form';
import { useParams } from 'react-router';

export type ContactEditProps = {};

export const ContactEdit: React.FC<ContactEditProps> = () => {
  const { customerId } = useParams();

  const { formLoading, formProps, saveButtonProps } = useForm<
    IContact,
    HttpError,
    IContact
  >({
    resource: 'contacts',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit Contact"
      resource="contacts"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <ContactForm formProps={formProps} />
    </Edit>
  );
};

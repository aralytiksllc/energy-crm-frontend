// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IContact } from '@/interfaces/contacts';
import { Create } from '@/components/create';
import { ContactForm } from './components/contact-form';

export type ContactCreateProps = {};

export const ContactCreate: React.FC<ContactCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IContact,
    HttpError,
    IContact
  >({
    resource: 'contacts',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create Contact"
      resource="contacts"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <ContactForm formProps={formProps} />
    </Create>
  );
};

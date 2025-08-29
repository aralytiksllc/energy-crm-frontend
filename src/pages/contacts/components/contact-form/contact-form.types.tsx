// External
import type { FormProps } from 'antd';

// Internal
import { IContact } from '@/interfaces/contacts';

export interface ContactFormProps {
  formProps: FormProps<IContact>;
}

// External
import type { FormProps } from 'antd/lib/form';

// Internal
import type { IUser } from '@/interfaces/users';

export interface UserFormProps {
  formProps: FormProps<IUser>;
}

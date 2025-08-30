// External
import type { Rule } from 'antd/es/form';

// Internal
import type { IUser } from '@/interfaces/users';

export const rules: Partial<Record<keyof IUser, Rule[]>> = {
  firstName: [
    {
      required: true,
      message: 'First name is required',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Last name is required',
    },
  ],
  email: [
    {
      required: true,
      message: 'Email is required',
    },
    {
      type: 'email',
      message: 'Please enter a valid email',
    },
  ],
  roleId: [
    {
      required: true,
      message: 'Role is required',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters',
    },
  ],
  passwordOptional: [
    {
      min: 8,
      message: 'Password must be at least 8 characters',
    },
  ],
};

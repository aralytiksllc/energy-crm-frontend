import type { Rule } from 'antd/lib/form';
import type { IUser } from '@interfaces/users';

type UserFormRules = Partial<Record<keyof IUser, Rule[]>>;

export const createRules = (canManageRoles = false): UserFormRules => ({
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
  roleId: canManageRoles
    ? [
        {
          required: true,
          message: 'Role is required',
        },
      ]
    : [],
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
});

export const rules = createRules();

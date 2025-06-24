import { Rule } from 'antd/lib/form';
import { IUser } from '@/interfaces/users';

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
  password: [
    {
      required: true,
      message: 'Password is required',
    },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
    },
  ],
  dateOfBirth: [
    {
      required: true,
      message: 'Date of birth is required',
    },
  ],
  dateOfJoining: [
    {
      required: true,
      message: 'Date of joining is required',
    },
  ],
  isActive: [
    {
      required: true,
      message: 'Active status is required',
    },
  ],
  notes: [
    {
      max: 500,
      message: 'Notes cannot exceed 500 characters',
    },
  ],
  settings: [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.resolve();
        }
        try {
          JSON.parse(value);
          return Promise.resolve();
        } catch {
          return Promise.reject(new Error('Settings must be a valid JSON'));
        }
      },
    },
  ],
} as const;
